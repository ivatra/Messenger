export const CaptchaSvg = ({ svgData }: { svgData: string; }) => (
    <div dangerouslySetInnerHTML={{ __html: svgData }} />
);
