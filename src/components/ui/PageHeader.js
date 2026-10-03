import Breadcrumbs from "./Breadcrumbs";

export default function PageHeader({ crumbs, title, intro }) {
  return (
    <section className="bg-gradient-to-br from-[#EAF4FF] via-white to-[#E6F7F9]">
      <div className="container-x py-10 md:py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg">{intro}</p>}
      </div>
    </section>
  );
}
