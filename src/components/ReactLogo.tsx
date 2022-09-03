import reactLogo from '../logo.svg';

export const ReactLogo = () => {
    return (
        <img alt='logo' src={reactLogo} style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '130px'
        }} />
    )
}
