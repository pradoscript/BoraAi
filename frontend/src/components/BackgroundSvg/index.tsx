const BackgroundSvg = () => (
    <svg className="backgroundSvg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
            <radialGradient id="grad1" cx="20%" cy="20%" r="80%" fx="20%" fy="20%">
                <stop offset="0%" stopColor="#cc01c8" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#320068" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="grad2" cx="80%" cy="80%" r="80%" fx="80%" fy="80%">
                <stop offset="0%" stopColor="#a501a2" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#170030" stopOpacity="0" />
            </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="15" fill="url(#grad1)" />
        <circle cx="80" cy="80" r="12" fill="url(#grad2)" />
        <circle cx="40" cy="70" r="8" fill="rgba(204, 1, 200, 0.08)" />
        <circle cx="70" cy="30" r="6" fill="rgba(160, 1, 156, 0.06)" />
    </svg>
);

export default BackgroundSvg;