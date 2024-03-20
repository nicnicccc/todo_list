const ProgressBar = (progress) => {

    const persen = JSON.stringify(progress.progress) + "%"

    return (
        <div className={'outer-bar'}>
            <div className={'inner-bar'} style={{width: persen}}></div>
        </div>
    );
}

export default ProgressBar;