import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import HowToMakePestelAnalysis from "./HowToMakePestelAnalysis";

// The list of Blog Posts
export const BLOG_POSTS = [
  {
    name: "How to Make a PESTEL Analysis in 5 Minutes [Ultimate 2023 Guide]",
    url: "how-to-make-pestel-analysis",
    lead: "In today's rapidly changing business landscape, it is crucial for organizations to understand the external factors that influence their operations and strategic decision-making. One valuable tool that helps in this endeavor is the PESTEL analysis.",
    page: <HowToMakePestelAnalysis />,
  },
];

export default function BlogList() {
  return (
    <>
      <Header
        title={"Instant Personas Blog | Business Strategy"}
        isBlog={true}
      />
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 ">
              Our Blog
            </h2>
            <p className="font-light text-gray-500 sm:text-xl ">
              Dive into our comprehensive blog as we delve into the world of
              strategic business consulting, uncovering the power of user
              personas, SWOT analyses, and a myriad of other indispensable tools
              and techniques for driving business growth and maximizing
              competitive advantage.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md ">
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
                    <svg
                      className="mr-1 w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                    </svg>
                    Article
                  </span>
                  {/* <span className="text-sm">14 days ago</span> */}
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  <a href={"/blog/" + post.url}>{post.name}</a>
                </h2>
                <p className="mb-5 font-light text-gray-500 ">{post.lead}</p>
                <div className="flex justify-between items-center">
                  <a
                    href={"blog/" + post.url}
                    className="inline-flex items-center font-medium text-primary-600  hover:underline"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer isBlog={true} />
    </>
  );
}
