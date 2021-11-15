import { MaturityRating, IndustryIdentifier, ReadingModes, PrintType, PanelizationSummary, ImageLinks, Language } from '../interfaces/libros-response';

export class LibrosModel{
    title!:               string;
    subtitle?:           string;
    authors?:            string[];
    publisher?:          string;
    publishedDate?:      string;
    description?:        string;
    industryIdentifiers!: IndustryIdentifier[];
    readingModes!:        ReadingModes;
    pageCount?:          number;
    printType!:           PrintType;
    categories?:         string[];
    averageRating?:      number;
    ratingsCount?:       number;
    maturityRating!:      MaturityRating;
    allowAnonLogging!:    boolean;
    contentVersion!:      string;
    panelizationSummary!: PanelizationSummary;
    imageLinks!:          ImageLinks;
    language!:            Language;
    previewLink!:         string;
    infoLink!:            string;
    canonicalVolumeLink!: string;
    fechaLectura!:        string;
}