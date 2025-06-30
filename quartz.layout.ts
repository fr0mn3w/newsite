import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {

    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => {
        // Multiple ways to check if this is the index page
        const isHome = page.fileData.slug === "home" || 
                       page.fileData.slug === "" ||
                       page.slug === "home" ||
                       page.fileData.frontmatter?.title === "Home" ||
                       !page.fileData.slug; // Empty slug often means index
        
        return !isHome; // Return false (hide breadcrumbs) if it's the index page
      },
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      filterFn: (node) => {
        // Keep the default behavior (filter out tags)
        if (node.slugSegment === "tags") {
          return false;
        }
        
        // Also filter out the index page
        if (node.slugSegment === "home") {
          return false;
        }
        
        // Check by other properties just in case
        if (node.data) {
          if (node.data.slug === "home" || node.data.title === "Home") {
            return false;
          }
        }
        
        return true;
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      filterFn: (node) => {
        // Keep the default behavior (filter out tags)
        if (node.slugSegment === "tags") {
          return false;
        }
        
        // Also filter out the index page
        if (node.slugSegment === "home") {
          return false;
        }
        
        // Check by other properties just in case
        if (node.data) {
          if (node.data.slug === "home" || node.data.title === "Home") {
            return false;
          }
        }
        
        return true;
      },
    }),
  ],
  right: [],
}