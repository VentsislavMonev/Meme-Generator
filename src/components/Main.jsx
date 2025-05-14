import { useState, useEffect } from "react"

export default function Main(){
    const [memeInfo,setMemeInfo] = useState(
        {
            topText: "One does not simply",
            bottomText: "Walk into Mordor",
            imageUrl: "http://i.imgflip.com/1bij.jpg",
        }
    )

    const [memeList, setMemeList] = useState([]);

    function handleChange(event) {
        const {value,name} = event.target;
        setMemeInfo(prevMeme => ({
            ...prevMeme,
            [name]: value,
        }))

        // if(name === "topText") {
        //     setMemeInfo(prev => ({
        //         ...prev,
        //         topText : value,
        //     }));
        // }
        // else if(name === "bottomText"){
        //     setMemeInfo(prev => ({
        //         ...prev,
        //         bottomText : value,
        //     }));
        // }
    }

    function getNewMeme() {
        const newMeme = memeList[Math.floor(Math.random() * memeList.length)];
        console.log(newMeme);
        setMemeInfo(oldMemeInfo => (
        {
            ...oldMemeInfo,
            imageUrl:newMeme.url,
        })
        )
    }

    useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => {
            setMemeList(data.data.memes);
        })
    }, [])

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick = {getNewMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeInfo.imageUrl} />
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}