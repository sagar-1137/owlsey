import { MetadataRoute } from "next";

export const dynamic = "force-static";

/* Lets Android / Chrome show the right name, colour and icon when the site
   is saved to a home screen, and gives crawlers one more consistent identity
   signal. Colours match the site shell and the favicon tile. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Owlsey — Custom Software Studio",
    short_name: "Owlsey",
    description:
      "Owlsey builds custom web apps, mobile apps and internal tools for growing businesses.",
    start_url: "/",
    display: "browser",
    background_color: "#070b11",
    theme_color: "#070b11",
    icons: [
      { src: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
