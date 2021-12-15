import { useState } from 'react';

const WithImage = (WrappedComponent) => {
    return function WithWrapper(props) {
        const { data, setData, setError } = props,
            [isLoaded, setIsLoaded] = useState(false);

        const onInput = (event) => {
            setIsLoaded(false);
            setError(false);
            setData({
                ...data,
                url: event.target.value,
            });
        };

        const onSuccessImageLoaded = () => {
            setIsLoaded(true);
            setError(false);
        };

        const onBadImageLoaded = () => {
            setError(true);
            setIsLoaded(true);
        };

        return (
            <WrappedComponent
                {...props}
                onBadImageLoaded={onBadImageLoaded}
                onSuccessImageLoaded={onSuccessImageLoaded}
                onInput={onInput}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
            />
        );
    };
};

export default WithImage;
