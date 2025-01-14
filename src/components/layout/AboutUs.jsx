import SectionHeaders from "./SectionHeaders";

export default function AboutUs() {
  return (
    <section className="text-center my-16">
      <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p className="max-w-2xl  mt-4 font-lemon">
          We make it easy to order your favorite meals from local restaurants
          and have them delivered right to your door. Whether you’re in the mood
          for something classic, adventurous, or quick, BiteBox has you covered.
        </p>
      </div>
    </section>
  );
}
