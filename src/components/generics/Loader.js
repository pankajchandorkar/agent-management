import "../../style/common/loader.scss";
const LoaderScreen = () => (
    <div className = 'loader'>
        <Loader />
        <div>Loading...</div>
    </div>
)

export const Loader = () => (
    <div className = 'loading'>
        <span></span>
        <span></span>
        <span></span>
    </div>
)

export default LoaderScreen;