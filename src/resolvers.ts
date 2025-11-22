import { IResolvers } from "@graphql-tools/utils"


type Album ={
    id: string,
    title: String,
    artists: String,
    releaseDate: String,
    format?: String
}

const albums:Album[] =[
    {
        id: "1",
        title: "The dark side of the moon",
        artists: "Pink FLoyd",
        releaseDate: "1973-07-10",
        format: "CD"
    },
    {
        id: "2",
        title: "Continental Train",
        artists: "Damorte",
        releaseDate: "2023-10-07",
        format: "Vinyl"
    }
]

export const resolvers:IResolvers ={
    Query :{
        getAlbums:() => albums,
        getAlbum:(_, {id}) => albums.find(x => x.id ===id)
    },
    Mutation:{
        addAlbum: (_, {title, artists, releaseDate, format}) => {
            const newAlbum = {
                id: String(albums.length+1),
                title,
                artists,
                releaseDate,
                format 
            };
            albums.push(newAlbum)
            return albums.find( x => {x.id === String(albums.length)})
        }
    }
}           