import type {StructureBuilder} from 'sanity/structure'

/** Single Home document at fixed id so the desk always opens the same doc (no empty list). */
export function structure(S: StructureBuilder) {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home page')
        .id('singleton-home')
        .schemaType('homePage')
        .child(S.document().schemaType('homePage').documentId('home')),
    ])
}
