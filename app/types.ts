export interface Section {
  id: string
  label: string
  subSections?: Section[]
}

export interface PageSchema {
  title?: string
  path?: string
  body?: {
    type?: string
    children?: any
    toc?: any
  }
  description?: string
  seo?: {
    title?: string
    description?: string
  } & Record<string, any>
  navigation?: boolean | {
    title?: string
    description?: string
    icon?: string
  }
  // devamı var
}

export interface SearchResultItem {
  item: {
    content: string
    id: string
    level: number
    title: string
    titles: string[]
  }
  refIndex: number
}
