type AppProps = {
  title: string;
  bgImage: string;
  fgImage: string;
};

const ParalaxCard = ({ title, bgImage, fgImage }: AppProps) => {
  return (
    <article>
      <img src={bgImage} alt="" />
      <h3>{title}</h3>
      <img src={fgImage} alt="" />
      <div className="content">
        <p>French Bulldog</p>
      </div>
    </article>
  );
};

export default ParalaxCard;
