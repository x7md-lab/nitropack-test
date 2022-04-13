import {ImageMagick,
    initializeImageMagick}
    from '@imagemagick/magick-wasm'
   import * as MagickFormat
    from '@imagemagick/magick-wasm/magick-format.js'
   import { MagickReadSettings }
    from '@imagemagick/magick-wasm/settings/magick-read-settings.js'


export default eventHandler(async function (event){
    const getUrl = await fetch("https://api.waifu.pics/sfw/neko");
    let {url: imageLink} = await getUrl.json();
    let data_ = await fetch(imageLink);
    let dataBuffer = await data_.arrayBuffer();
    await initializeImageMagick();
        const readSettings = new MagickReadSettings(
        {
            format: MagickFormat.Jpeg
        });
    let imageData = {};
    await ImageMagick.read(new Uint8Array(dataBuffer), readSettings, async (image) => {
            const {height, width } = image;      
            imageData = {url:imageLink, height: height, width: width, size: dataBuffer.byteLength}
    });
    return (
        `
        <per>
        ${JSON.stringify(imageData)}
        </pre>
        <br />
        <img style="
        max-width: calc(100vw - 2.5rem);
        max-height: calc(100vh - 2.5rem);
        " src="${imageLink}" />
        `
    )
})