import Notation from "../components/home/notation";
import PDFReader from "../components/home/pdf-reader";

const HomePage = () => {
  return (
    <div className="flex w-full h-full justify-betwee gap-5">
      <PDFReader />
      <Notation />
    </div>
  );
};

export default HomePage;
