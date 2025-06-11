import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    //. Use Appwrite SDK to check if search term exists in DB
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', searchTerm),
    ])
    //. If it does, update count
    if(result.documents.length > 0) {
        const doc = result.documents[0];
        // Update the document count, this function needs to be completed before moving on to the next section
        await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {count: doc.count + 1})
    } 
    //. If not, create new doc with search term and set count as 1
    else {
        // Creates a new document with several properties and adds it to the collection. Function needs to be completed before moving to next section.
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm,
            count: 1,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })
    }
    } catch (error) {
        console.error(error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents
    } catch (error) {
        console.error(error)
    }
}