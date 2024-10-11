export const PageError = () => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (

        <div className='PageError'>
            <p>Произошла непредвиденная ошибка</p>
            <button onClick={reloadPage}>Перезагрузить страницу</button>
        </div>
    );
};
