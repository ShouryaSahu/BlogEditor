import config from "../config/config.js";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket; // These are variables name

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new TablesDB(this.client); // from "documentation object creation method"
        this.bucket = new Storage(this.client); // from "documentation object creation method"
    }

    // To create Post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try { // Incase agr hume Appwrite ke jgh koi aur database use krna pada toh hume keval try block change krna padega appwrite ke code ki jgh dusra database ka code
            return await this.databases.createRow({
                // Following syntax are according to the new Documentation of appwrite "https://appwrite.io/docs/products/databases/tablesdb/rows"
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            });
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
        }
    }

    // Slug is used as documentId or rowId
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
        }
    }

    // To delete post
    async deletePost(slug) {
        try {
            await this.databases.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
            });

            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false;
        }
    }

    // To get Single Post
    async getPost(slug) {
        try {
            return await this.databases.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
            })
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            return false;
        }
    }

    // To get All Posts whose status is "Active"
    async listPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                queries,
            })
        } catch (error) {
            console.log("Appwrite service :: allPost :: error ", error);
            return false;
        }
    }

    // File Upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file
            });
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error ", error);
            return false;
        }
    }

    // File Delete Service
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId: fileId
            });
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ", error);
            return false;
        }
    }

    // To Preview File
    getFilePreview(fileId) {
        return this.bucket.getFilePreview({
            bucketId: config.appwriteBucketId,
            fileId: fileId
        });
    }
}


const service = new Service();

export default service;


// Important difference
// Tutorial (old) -> Current Appwrite
// Database       -> Database
// Collection	  -> Table
// Document	      -> Row
// Databases	  -> TablesDB
// createDocument()-> createRow()
// collectionId   -> tableId
// documentId	  -> rowId