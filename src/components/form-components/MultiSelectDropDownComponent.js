import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faSearch, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Loader } from '../../components/generics/Loader';
import "../../style/common/drop-down.scss";
import { useDebounce } from "../generics/useDebounce";

const MultiSelectDropDown = forwardRef((props, ref) => {
    const { width, listWidth = width, name, label, isCompulsory, options, preSelectedValues = [], searchPlaceholder, disabled, remoteData = false, canSearch = true } = props;
    const defaultValue = Object.assign([], preSelectedValues);
    const [showDrop, setShowDrop] = useState(false);
    const [focus, setFocus] = useState(false);
    const [blur, setBlur] = useState(true);
    const [list, setList] = useState(options);
    const [selectedDisplayValue, setSelectedDisplayValue] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [remoteSearchInput, setRemoteSearchInput] = useState("");
    const [filteredLists, setFilteredLists] = useState(options);
    const [loading, setLoading] = useState(false);
    const dropRef = useRef(null);
    const searchInputRef = useRef(null);
    const debouncedSearchTerm = useDebounce(remoteSearchInput, 500);


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropRef]);

    useEffect(() => {
        const { options } = props;
        setList(options);
        setFilteredLists(options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    useEffect(() => {
        if (defaultValue.length > 0 && options.length > 0) {
            const { isObject, primaryKey } = props
            if (isObject) {
                let selectedItems = [];
                for (let dv of defaultValue) {
                    const selectedItem = list.find((l) => l[primaryKey] === dv[primaryKey]);
                    if (selectedItem) {
                        selectedItems.push(selectedItem);
                    }
                }
                setSelectedValues(selectedItems);
            } else {
                setSelectedValues(defaultValue);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { isObject, labelKey } = props;
        if (selectedValues.length > 0) {
            if (isObject) {
                const selectedDisplayValuesArr = selectedValues.map(item => item[labelKey]);
                setSelectedDisplayValue(selectedDisplayValuesArr.join(','));
            } else {
                setSelectedDisplayValue(selectedValues.join(','));
            }
        } else {
            setSelectedDisplayValue('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues])

    useEffect(() => {
        const { remoteData = false } = props;
        if (remoteData) {
            if (debouncedSearchTerm) {
                setLoading(true);
                fetchRemoteData(debouncedSearchTerm).then((options) => {
                    setLoading(false);
                    setFilteredLists(Object.assign([], options));
                });
            } else {
                setFilteredLists([]);
                setLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm] // Only call effect if debounced search term changes
    );


    const fetchRemoteData = async (searchValue) => {
        const { fetchRemoteDataHandler = () => { return [] } } = props;
        let newOptions = await fetchRemoteDataHandler(searchValue);
        return newOptions;
    }

    const handleClickOutside = (e) => {
        if (!(dropRef && dropRef.current && dropRef.current.contains(e.target))) {
            setShowDrop(false);
        }
    };

    const handleDrop = (e) => {
        setSearchInput('');
        setShowDrop(true);
        setFilteredLists(list);
    };

    const onRemoveSelectedItem = (item) => {
        let index = -1;
        const { onRemove, primaryKey, isObject } = props;
        if (isObject) {
            index = selectedValues.findIndex((sv) => sv[primaryKey] === item[primaryKey])
        } else {
            index = selectedValues.indexOf(item);
        }
        if (index >= 0) {
            selectedValues.splice(index, 1);
            if (onRemove)
                onRemove(selectedValues, item);

            setSelectedValues(Object.assign([], selectedValues));
        }
    }

    const onSelectItem = (e, item) => {
        const { onSelect = () => { }, singleSelect } = props;
        e.stopPropagation();
        if (singleSelect) {
            onSingleSelect(item);
            onSelect([item], item);
            return;
        }
        if (isSelectedValue(item)) {
            onRemoveSelectedItem(item);
            return;
        }
        selectedValues.push(item);
        onSelect(selectedValues, item);
        setSelectedValues(Object.assign([], selectedValues));

    }

    const onSingleSelect = (item) => {
        const { isObject, labelKey } = props
        setSelectedValues([item]);
        setSelectedDisplayValue(isObject ? item[labelKey] : item);
        setShowDrop(false);
    }


    const searchItems = (searchValue) => {
        if (remoteData) {
            setRemoteSearchInput(searchValue);
            return;
        }
        setSearchInput(searchValue);
        if (searchValue !== "") {
            const filterData = list.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFilteredLists(filterData);
        } else {
            setFilteredLists(Object.assign([], list));
        }
    };

    const clearSearchInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            searchItems('');
        }
    }

    const resetItem = () => {
        const { onRemove } = props;
        setSelectedDisplayValue("");
        setSelectedValues([]);
        if (onRemove)
            onRemove([]);

    };

    const isSelectedValue = (item) => {
        const { isObject, primaryKey } = props;
        if (isObject) {
            return (selectedValues.filter(i => i[primaryKey] === item[primaryKey]).length > 0);
        }
        return selectedValues.filter(i => i === item).length > 0;
    }

    useImperativeHandle(ref, () => ({
        resetAutocomplete(event) {
            resetItem()
        }
    }));

    const renderOptionList = () => {
        const { loadingMessage = 'Loading...', isObject, style = [], labelKey, primaryKey, noDataLabel = 'No results found' } = props;
        if (loading) {
            return (
                <div className="loading-container">
                    <Loader />
                    {typeof loadingMessage === 'string' && <span style={style['loadingMessage']} className={`not--found`}>{loadingMessage}</span>}
                </div>
            )
        }
        return (
            filteredLists.length > 0 ? (
                filteredLists.map((el, index) => {
                    const isSelected = isSelectedValue(el);
                    const optionKey = isObject ? el[primaryKey] : `${el}-${index}`;
                    const optionLabel = isObject ? el[labelKey] : el;
                    return (
                        <div key={optionKey} className={`drop--item ${isSelected ? "selected" : ""}`} onClick={(e) => onSelectItem(e, el)}>
                            <div className={`search--checkbox ${isSelected ? "checked" : ""}`}>
                                {isSelected && (
                                    <span className="check">
                                        <FontAwesomeIcon icon={faCheck} color={"#fff"} />
                                    </span>
                                )}
                            </div>
                            <div>{optionLabel}</div>
                        </div>
                    )
                })
            ) : (
                <div className="not--found">{noDataLabel}</div>
            )
        )
    }

    const labelTxyt =
        isCompulsory ? (
            <span>
                {label}
                <span style={{ color: "red", paddingLeft: "5px" }}>*</span>
            </span>
        ) : (
            label
        );
    return (
        <div className={`dropdown--wrapper ${disabled ? "disable" : ""}`} style={{ width: width }} ref={dropRef} onClick={handleDrop}>
            <input
                type="text"
                className={`inp--field ${disabled ? "disable" : ""}`}
                onFocus={() => {
                    setFocus(true);
                    setBlur(false);
                }}
                onBlur={() => {
                    setBlur(true);
                    setFocus(false);
                }}
                value={selectedDisplayValue}
                readOnly
            />
            {selectedDisplayValue && !disabled && (
                <div className="cross--icon" onClick={resetItem}>
                    <span className="cross">
                        <FontAwesomeIcon icon={faXmark} color={"#777"} />
                    </span>
                </div>
            )}
            <div className="caret--icon">
                {showDrop ? (
                    <FontAwesomeIcon icon={faCaretUp} color={"#777"} />
                ) : (
                    <FontAwesomeIcon icon={faCaretDown} color={"#777"} />
                )}
            </div>
            <div className={`inp--label ${focus ? "active" : selectedDisplayValue && blur ? " filled" : ""}`}>
                {labelTxyt}
            </div>
            {showDrop && (
                <div className="drop--wrapper" style={{ width: listWidth }}>
                    {canSearch && (
                        <div className="drop--search">
                            <input
                                name={name}
                                type="text"
                                className="search"
                                placeholder={searchPlaceholder}
                                onChange={(e) => searchItems(e.target.value)}
                                ref={searchInputRef}
                            />
                            <div className="search--icon">
                                <FontAwesomeIcon icon={faSearch} color={"#777"} />
                            </div>
                            {(searchInput || remoteSearchInput) && (
                                <div className="cross--icon" onClick={clearSearchInput}>
                                    <span className="cross">
                                        <FontAwesomeIcon icon={faXmark} color={"#777"} />
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="drop--content scroll">
                        {renderOptionList()}
                    </div>
                </div>
            )}
        </div>
    );
});


export default MultiSelectDropDown;