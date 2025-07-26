import { BLOG_TITLE } from "@/constants";

export const metadata = {
  title: `${BLOG_TITLE} - 404 Not Found`,
  robots: "noindex, follow",
  description: "This page does not exist. Please check the URL and try again.",
};

function NotFoundPage() {
  return (
    <div className="not-found-wrapper">
      <h1>404 Not found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}

export default NotFoundPage;
