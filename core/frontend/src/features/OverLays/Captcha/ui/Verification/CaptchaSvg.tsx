export const CaptchaSvg = ({ svgData }: { svgData: string; }) => (
    <div style = {{overflow:'hidden',maxWidth:'100%'}} dangerouslySetInnerHTML={{ __html: svgData }} />
);
