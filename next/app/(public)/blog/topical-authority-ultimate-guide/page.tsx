import TableOfContents from "@/components/page-specific/blog/TableOfContents";
import { ReadMore } from "@/components/page-specific/blog/readMore";
import ReadingBar from "@/components/page-specific/blog/readingBar";
import { Share } from "@/components/page-specific/blog/share";
import Image from "next/image";

export default function CraftStrongUserPersona() {
  return (
    <main className="bg-white pb-16 pt-8 lg:pb-24 lg:pt-16">
      <ReadingBar />
      <title>
        {"Everything You Need to Know About Topical Authority (2024)"}
      </title>
      <meta
        name="description"
        content="Quickly learn how to build and measure topical authority with our comprehensive guide."
      />
      <h1 className="mb-4 px-4 text-3xl font-extrabold leading-tight text-gray-900 sm:hidden lg:mb-6 lg:text-4xl">
        Everything You Need to Know About Topical Authority (2024)
      </h1>
      <div className="mx-auto flex max-w-screen-xl justify-between px-4 max-sm:flex-col">
        <TableOfContents />
        <article className="format format-sm sm:format-base lg:format-lg format-blue mx-auto w-full max-w-2xl">
          <header className="not-format mb-4 lg:mb-6">
            <address className="mb-6 flex items-center not-italic">
              {/* <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                  <img
                    className="mr-4 w-16 h-16 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1661173209662898176/sPhCXv7U_400x400.jpg"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 "
                    >
                      Jacob Bildy
                    </a>
                    <p className="text-base font-light text-gray-500 ">
                      Entrepreneur, Founder @ InstantPersonas.com
                    </p>
                    <p className="text-base font-light text-gray-500 ">
                      <time
                        // pubdate
                        // datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </div> */}
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 max-sm:sr-only lg:mb-6 lg:text-4xl">
              Everything You Need to Know About Topical Authority (2024)
            </h1>
          </header>
          <h2 className="mb-3 font-jost text-3xl font-bold" id={"0"}>
            What is Topical Authority?
          </h2>
          <p>
            Topical Authority refers to the level of expertise and credibility
            your site holds in a specific subject area. It&apos;s about depth
            and breadth of knowledge in a specific field, and how effectively
            you communicate that through your content.
            <Image
              src="/blogs/topical-authority/what-is-topical-authority.png"
              height={400}
              width={400}
              alt="Topical authority explained"
              className="mx-auto my-5 rounded-md"
              unoptimized
            />
            Building topical authority means you have produced comprehensive,
            high-quality content that covers your chosen subject in detail. This
            not only establishes you as a thought leader in your field, but also
            signals to search engines that your content is a valuable resource
            on the subject, boosting your SEO rankings.
          </p>
          <h2 className="mb-3 mt-10 font-jost text-3xl font-bold" id={"1"}>
            What is a Topical Authority Map?
          </h2>
          <p>
            A Topical Authority Map is a diagram showing how all your content on
            a certain topic links together.
            <Image
              src="/blogs/topical-authority/topical_authority_map_steps.png"
              height={600}
              width={500}
              alt="How to make a Topical authority map"
              className="mx-auto my-5 rounded-md"
              unoptimized
            />
            It shows the main topic and related subtopics. Each subtopic has
            content that links to the main topic, helping users and search
            engines understand the content. These subtopics should appeal to
            your user persona, which should guide the creation of your topical
            authority map. Read more about{" "}
            <a
              href="https://instantpersonas.com/blog/craft-a-strong-user-persona-in-2024"
              className="text-blue-500"
            >
              making user personas here
            </a>
            .
          </p>
          <h2 className="mb-3 mt-10 font-jost text-3xl font-bold" id="2">
            How to Get Topical Authority on your Site
          </h2>
          <Image
            src="/blogs/topical-authority/topical-authority-steps.png"
            height={400}
            width={400}
            alt="Building Topical Authority"
            className="mx-auto my-5 rounded-md"
            unoptimized
          />
          <p>
            - <b>Step 1: Niche Down</b> Focus on one topic to establish
            expertise rather than covering multiple broad areas.
            <br></br>
            <br></br>- <b>Step 2: Do Keyword Research</b> Identify all relevant
            keywords and queries your target audience is searching for in your
            niche.
            <br></br>
            <br></br>- <b>Step 3: Determine Content Clusters</b> Determine which
            queries need full blog posts versus sections in posts, and plan your
            content clusters.
            <br></br>
            <br></br>- <b>Step 4: Write Pillar Content</b> Create comprehensive,
            well-researched pillar articles that serve as the main hub for
            related topics.
            <br></br>
            <br></br>- <b>Step 5: Build Topic Clusters</b> Expand your coverage
            by writing detailed sub-articles connected to your pillar content.
            <br></br>
            <br></br>- <b>Step 6: Connect Using Internal Links</b> Strategically
            link between articles to enhance topic authority and improve SEO.
          </p>
          <h2 className="mb-3 mt-10 font-jost text-3xl font-bold" id="3">
            How to Measure Topical Authority?
          </h2>
          <p>
            <iframe
              style={{ maxWidth: "100%" }}
              width="640"
              height="365"
              src="https://www.youtube.com/embed/dS-woxIXe2g"
              title="Estimate Topical Authority"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mx-auto mb-6 ml-0 mr-0"
            />
            <a href="https://www.growth-memo.com/p/how-to-measure-topical-authority">
              Kevin Indig
            </a>{" "}
            came up with Topic Share which can help you estimate a site’s
            Topical Authority. To determine Topic Share, which is essentially
            your Topical Authority, you need to calculate the traffic obtained
            from keywords within a given topic for you or your competitors.
            Here&apos;s how you can do it using <b>Ahrefs</b>:<br></br>{" "}
            <br></br>
            1. Input a primary term (for instance,
            &apos;&apos;ecommerce&apos;&apos;) into the Keyword Explorer.
            <br></br> <br></br>
            2. Navigate to Matching Terms and apply a filter for Volume greater
            than 10.
            <br></br> <br></br>
            3. Export all the keywords and then re-upload them into Keyword
            Explorer.
            <br></br> <br></br>
            4. Access the section for traffic share by domains.
            <br></br> <br></br>
            5. The resulting traffic share equals the Topic Share, which is
            synonymous with &apos;&apos;Topical Authority&apos;&apos;.
          </p>
          <h2 className="mb-3 mt-10 font-jost text-3xl font-bold" id="4">
            Topical Relevance vs Topical Authority
          </h2>
          <p>
            Topical relevance and topical authority are distinct but
            complementary aspects of SEO.
            <br></br> <br></br>
            <b>Topical relevance</b> focuses on how well content aligns with
            specific keywords or topics, ensuring it matches search intent
            through keyword use and detailed coverage.
            <br></br> <br></br>
            <b>Topical authority</b> evaluates a website&apos;s depth of
            expertise in a subject, determined by extensive, quality content and
            reputable backlinks. While relevance ensures content is appropriate
            for a query, authority builds trust and credibility, enhancing a
            site’s reputation and search rankings.
          </p>
          <h2 className="mb-3 mt-10 font-jost text-3xl font-bold" id="5">
            Should you update old content?
          </h2>
          <p>
            Updating old content does not penalize you in terms of SEO. In fact,
            it can significantly boost your SEO performance. Search engines like
            Google favor fresh, up-to-date content, and routinely updating your
            content signals to them that your site is active and current.
            However, it&apos;s important not to update content just for the sake
            of it. Here&apos;s when you should update your content:
            <br></br> <br></br>
            1. <b>Outdated Information</b>: If the information in your content
            is outdated or no longer accurate, it&apos;s time to update. This
            could include statistics, data, or references to events or trends
            that are no longer relevant.
            <br></br> <br></br>
            2. <b>Change in Keyword Rankings</b>: If your content used to rank
            well for certain keywords but has since dropped in the rankings, it
            might be a good time to update the content and improve its SEO.
            <br></br> <br></br>
            3. <b>Low Engagement or Traffic</b>: If a piece of content is not
            performing well in terms of user engagement or traffic, updating it
            could improve its performance.
            <br></br> <br></br>
            4. <b>New Developments or Insights</b>: If there are new
            developments or insights in your field that are relevant to your
            content, it would be beneficial to update your content to include
            this information.
            <br></br> <br></br>
            Remember, the ultimate goal of updating content is to provide the
            best possible value to your audience. If updating a piece of content
            will improve its usefulness to your readers, it&apos;s worth doing.
            Refactoring an article into new subarticles can significantly
            improve your SEO performance by allowing you to cover more keywords
            and subtopics. Make sure all subarticles are interconnected and lead
            back to the main pillar content through a strong internal linking
            strategy. This helps to maintain the topical authority of your site
            and avoid any potential SEO issues, including{" "}
            <b>keyword cannabilization</b>.
          </p>
          <h2 className="mb-3 mt-10 font-jost text-3xl font-bold" id="6">
            What is Keyword Cannabilization?
          </h2>
          <p>
            Keyword cannibalization happens when different content on your site
            targets the same keyword, which leads to competition between your
            own pages. To avoid this, each content piece should target a unique
            keyword. A Topical Authority Map can help in this process. It helps
            ensure your keywords are distributed evenly across your content,
            avoiding overlaps, and enhancing the depth of your content.
          </p>
          <h2 className="mb-3 mt-10 font-jost text-3xl font-bold" id="7">
            Can you increase topical authority with backlinks or through guest
            posting?
          </h2>
          If you get a lot of backlinks from high-authority sites in your niche,
          it can help you increase your topical authority. These are called
          topically relevant backlinks.
          <br></br>
          <br></br>
          One of the best ways to get topically relevant backlinks is through
          high-quality guest posts, allowing you to showcase your expertise on
          other reputable platforms, and bring fresh eyes to your content. For a
          deeper dive into how guest posting can transform your Topical
          Authority and the best practices to follow, read{" "}
          <a
            href="https://instantpersonas.com/blog/guest-posting-ultimate-guide"
            className="text-blue-500"
          >
            our detailed guide on guest posting
          </a>
          .
          <p>
            <br></br> <br></br>
            Want to make a comprehensive User Persona in 5 minutes?{" "}
            <a href="https://InstantPersonas.com/" className="text-blue-500">
              {" "}
              Use our AI powered platform{" "}
            </a>{" "}
            to generate insights instantly based on a description of your
            business.
          </p>
          <Share
            url="https://instantpersonas.com/blog/topical-authority-ultimate-guide"
            title={"Everything You Need to Know About Topical Authority (2024)"}
          />
        </article>
      </div>
      <ReadMore currentSlug="topical-authority-ultimate-guide" />
    </main>
  );
}
