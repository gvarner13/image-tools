// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  title: string;
  bgImage: string;
  fgImage: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const ParalaxCard = ({ title, bgImage, fgImage }: AppProps) => {
  return (
    <div>
      <img src={bgImage} alt="" />
      <span>{title}</span>
      <img src={fgImage} alt="" />
    </div>
  );
};

export default ParalaxCard;
