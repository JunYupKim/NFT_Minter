export const NFTsome = ({ image, description }) => {
    return (
        <div className="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            <img className='w-full rounded-t-md' src={image}></img>
            <div className="p-3">
                <p>{description? description.slice(0, 200) : "No Description"}</p>
            </div>
        </div>
    )
}

// export default NFTsome; 