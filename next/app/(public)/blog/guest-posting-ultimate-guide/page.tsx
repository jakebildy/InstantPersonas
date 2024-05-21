import TableOfContents from "@/components/page-specific/blog/TableOfContents";
import { ReadMore } from "@/components/page-specific/blog/readMore";
import ReadingBar from "@/components/page-specific/blog/readingBar";
import { Share } from "@/components/page-specific/blog/share";
import Image from "next/image";

export default function GuestPostingUltimateGuide() {
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white ">
      <ReadingBar />
      <title>{"The Ultimate Guide to Guest Posting (2024)"}</title>
      <meta
        name="description"
        content="Everything you need to know to do guest posting right in 2024. Learn if you should you use AI to write posts, and more."
      />
      <h1 className="sm:hidden mb-4 px-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">
        The Ultimate Guide to Guest Posting (2024)
      </h1>
      <div className="flex max-sm:flex-col justify-between px-4 mx-auto max-w-screen-xl ">
        <TableOfContents />
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
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
            <h1 className="max-sm:sr-only mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">
              The Ultimate Guide to Guest Posting (2024)
            </h1>
          </header>

          <h2 className="text-3xl font-bold mb-3 font-jost" id={"0"}>
            How do I know if a site is worth writing a guest post for?
          </h2>
          <p>
            There&apos;s a few things to consider. <br></br>
            <br></br>The most important question you should ask is, would your
            target audience even be reading this? You need to get in the head of
            your target audience and really understand them and their content
            consumption habits.
            <br></br> <br></br> A great way to do this is by creating a user
            persona. That&apos;s pretty much what we offer at InstantPersonas
            but you can also check out{" "}
            <a
              href="https://instantpersonas.com/blog/craft-a-strong-user-persona-in-2024"
              className="text-blue-500"
            >
              our blog post about how to make a really strong user persona
            </a>
            .<br></br> <br></br>
            Secondly, does the site accept everything that gets submitted to it?
            Check them out and see how many poorly written articles they&apos;ve
            published. Given two sites with similar metrics, the higher their
            editorial standards, the better the backlink. That also means you
            need to make sure your content passes their editorial standards.
          </p>

          <h2 className="text-3xl font-bold mb-3 font-jost mt-10" id={"1"}>
            Should I write a guest post with AI?
          </h2>
          <p>
            The internet is being flooded with AI generated content. We can
            assume Google would rather surface human written content if it can
            identify it. Understand as well, that people prompting similar
            things will lead to hundreds of similar blog posts. <br></br>
            <br></br>
            Some people say to avoid AI generated content completely. Others say
            it&apos;s completely fine. After doing a deep dive into this, it
            seems like the answer is we still don&apos;t really know. <br></br>
            <br></br>
            What I think is likely better is to have AI assist you without
            taking over from you. That means letting it help you come up with
            outlines, ideas, and iterations when you get stuck, but trying to
            write it out yourself and ensuring your human-ness shines through.
            Talk about specific stories/experience that demonstrate your
            expertise on a topic. <br></br>
            <br></br>
            I&apos;d also recommend feeding your blogs into a tool like{" "}
            <a
              href="https://gptzero.me/"
              // ref="nofollow"
              className="text-blue-500"
            >
              GPT Zero
            </a>{" "}
            to see how likely your content is to be perceived as AI-written.
            <br></br>
            <br></br>
            As far as it relates to guest posting, poorly-written AI-generated
            content will likely not get accepted. If it does, that&apos;s an
            indication that the site likely accepts pretty much anything and is
            therefore not likely to be a strong backlink.
            <br></br>
            <br></br>
            There are other ways you can leverage AI to boost your SEO however.
            Check out our{" "}
            <a
              href="https://instantpersonas.com/blog/best-ai-tools-for-seo"
              className="text-blue-500"
            >
              comprehensive guide here
            </a>
            .<br></br>
            <br></br> As more information comes out about AI and SEO, I&apos;ll
            come back and update this article.
          </p>

          <h2 className="text-3xl font-bold mb-3 font-jost mt-10" id="2">
            Does guest posting boost your topical authority?
          </h2>
          <p>
            Yes, it can. Getting high quality backlinks in your niche signals to
            search engines that your content is authoritative.
            <br></br>
            <br></br>
            When you&apos;re starting out however, it&apos;s much better to
            focus on content first.{" "}
            <a
              href="https://samanthanorth.com/topical-authority"
              // rel="nofollow"
              className="text-blue-500"
            >
              Samantha North
            </a>{" "}
            mentions being on page one and outranking sites with high domain
            authority with a site that had a domain authority of 16. Why?
            Topical authority. To learn what topical authority is, how to get it
            and how to measure it, check out our blog post{" "}
            <a
              href="https://instantpersonas.com/blog/topical-authority-ultimate-guide"
              className="text-blue-500"
            >
              here
            </a>
            .
          </p>

          <h2 className="text-3xl font-bold mb-3 font-jost mt-10" id="3">
            How do I find relevant blogs or websites to submit guest posts to?
          </h2>
          <p>
            <iframe
              style={{ maxWidth: "100%" }}
              width="640"
              height="365"
              src="https://www.youtube.com/embed/EUnq_csVcVM"
              title="Find Free Guest Post Opportunities"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mx-auto mr-0 ml-0 mb-6"
            />
            We built you a free tool to find tons of great guest posting
            opportunities. No signup needed -{" "}
            <a
              href="https://instantpersonas.com/tools/guest-post-finder"
              className="text-blue-500"
            >
              check it out here.
            </a>
          </p>

          <h2 className="text-3xl font-bold mb-3 font-jost mt-10" id="5">
            How do I craft a compelling guest post pitch that is likely to be
            accepted?
          </h2>
          <Image
            src="/blogs/guest-posting/guest-post-pitching.gif"
            height={400}
            width={300}
            alt="How to Pitch a Guest Post"
            className="mx-auto rounded-md my-5"
            unoptimized
          />
          <p>
            Here&apos;s one strategy. Use an SEO tool like Ahrefs and identify a
            topic where their competitor outranks them, effectively a gap in
            their{" "}
            <a
              href="https://instantpersonas.com/blog/topical-authority-ultimate-guide"
              className="text-blue-500"
            >
              topical authority
            </a>
            . Send them a message making them aware of this, and offer to write
            them an article covering this deeply for free. This is a great way
            to convey the value proposition of your post.
            <br></br>
            <br></br>
            Another useful tip - you want to demonstrate that you are an
            authority on a topic. If you have any way to demonstrate this, make
            sure to let them know.
            <br></br>
            <br></br>
            Provide them with writing samples as well so they know your post
            will be high quality.
            <br></br>
            <br></br>
            Ensure your subject line is clear. MailChimp suggests the following
            subject line formula:
            <br></br>
            <b>
              Pitch for: Name of publication, name of the column and/or short
              headline.
            </b>
          </p>

          <h2 className="text-3xl font-bold mb-3 font-jost mt-10" id="6">
            What are the best practices for including links in my guest posts
            without appearing spammy?
          </h2>
          <p>
            1. <b>Add Value</b> - Ensure that every link you include adds real
            value to the reader. <br></br>
            <br></br>
            2. <b>Links should make sense</b> - The linked content should be
            directly relevant to the topic being discussed in the paragraph or
            section where the link is inserted. <br></br>
            <br></br>
            3. <b>Limit the number of links</b>
            <br></br>
            <br></br>
            4. <b>Disclose relationships and affiliations</b> - If your link is
            to a site with which you have a commercial relationship or any other
            form of affiliation, it&apos;s good practice to disclose this
            transparently in your post.
          </p>
          <h2 className="text-3xl font-bold mb-3 font-jost mt-10" id="7">
            Should I accept guest posts on my own blog?
          </h2>
          <p>
            Sure! So long as they&apos;re high quality and from an authoritative
            source, it can increase your own blog&apos;s output and{" "}
            <a
              href="https://instantpersonas.com/blog/topical-authority-ultimate-guide"
              className="text-blue-500"
            >
              topical authority
            </a>{" "}
            without you needing to do a ton of work.
          </p>
          <h2 className="text-3xl font-bold mb-3 font-jost mt-10" id="8">
            How do I evaluate guest posts people send me?
          </h2>
          <p>
            1. Check for plagiarism to ensure the content is unique. Copyscape
            is one software that lets you do this. Make sure it&apos;s not just
            rephrasing another article.
            <br></br> <br></br>2. Make sure it relates to the content your blog
            publishes. <br></br> <br></br>
            3. Check if it&apos;s AI generated by feeding it into GPT Zero.{" "}
            <br></br> <br></br>
            4. Actually read it. <br></br> <br></br>
            5. Ensure the content linked from the guest posts is high-quality
            too.
          </p>
          <h2 className="text-3xl font-bold mb-3 font-jost mt-10" id="9">
            What&apos;s the difference between guest posting vs niche edits?
          </h2>
          <p>
            Niche edits are a lot less effort than guest posting. Instead of
            pitching a completely new piece of content, you offer to update
            older content for them and add a link inside it. So why would
            another site owner do this, knowing the value of a link? The answer
            is that this is commonly a paid tactic. This goes directly against
            Google&apos;s guidelines - if caught, you can get penalties.
            <br></br> <br></br>
            Additionally, because you&apos;re offering far less value than a
            guest post, your conversion rate is much lower.
          </p>
          {/* <p>
            <br></br> <br></br>
            Want to make a comprehensive User Persona in 5 minutes?{" "}
            <a href="https://InstantPersonas.com/" className=" text-blue-500">
              {" "}
              Use our AI powered platform{" "}
            </a>{" "}
            to deeply understand your audience quickly based on a description of
            your business.
          </p> */}
          <Share
            url="https://instantpersonas.com/blog/guest-posting-ultimate-guide"
            title={"The Ultimate Guide to Guest Posting (2024)"}
          />
        </article>
      </div>
      <ReadMore currentSlug="guest-posting-ultimate-guide" />
    </main>
  );
}
