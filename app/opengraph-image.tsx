/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain image elements, not next/image. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Orvyn — Branding, websites and marketing. Thoughtfully connected.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const [hero, mark, displayFont, bodyFont] = await Promise.all([
    readFile(path.join(process.cwd(), "docs/revamp/source-assets/orvyn-hero-source.png")),
    readFile(path.join(process.cwd(), "public/orvyn-icon.svg"), "utf8"),
    readFile(path.join(process.cwd(), "app/fonts/cormorant-og.ttf")),
    readFile(path.join(process.cwd(), "app/fonts/dm-sans-og.ttf"))
  ]);
  const markUri = "data:image/svg+xml;base64," + Buffer.from(mark.replace("#ededed", "#242420")).toString("base64");
  return new ImageResponse(<div style={{ width:1200, height:630, display:"flex", position:"relative", background:"#f5f1e9", color:"#242420", fontFamily:"Orvyn Display" }}>
    <img alt="" src={"data:image/png;base64," + hero.toString("base64")} width={1200} height={675} style={{ position:"absolute", top:-22, left:0 }} />
    <div style={{ display:"flex", position:"absolute", left:62, top:48, gap:12, alignItems:"center" }}><img alt="" src={markUri} width={34} height={34} /><span style={{ fontFamily:"Orvyn Sans", fontSize:22, fontWeight:600, letterSpacing:4 }}>ORVYN</span></div>
    <div style={{ display:"flex", flexDirection:"column", position:"absolute", left:62, top:161, width:730 }}>
      <span style={{ fontFamily:"Orvyn Sans", fontSize:11, letterSpacing:3, marginBottom:22 }}>INDEPENDENT BRAND GROWTH STUDIO</span>
      <span style={{ fontSize:74, fontWeight:600, letterSpacing:-3, lineHeight:1.03 }}>Good brands</span><span style={{ fontSize:74, fontWeight:600, letterSpacing:-3, lineHeight:1.03 }}>deserve a better</span><span style={{ fontSize:74, fontWeight:600, letterSpacing:-3, lineHeight:1.03 }}>presence.</span>
      <span style={{ fontFamily:"Orvyn Sans", fontSize:16, marginTop:28 }}>Branding, websites and marketing. Thoughtfully connected.</span>
    </div>
    <span style={{ display:"flex", position:"absolute", left:62, bottom:39, fontFamily:"Orvyn Sans", fontSize:13 }}>orvyn.cc</span>
  </div>, { ...size, fonts: [{ name: "Orvyn Display", data: displayFont.buffer.slice(displayFont.byteOffset, displayFont.byteOffset + displayFont.byteLength) as ArrayBuffer, weight:600 }, { name: "Orvyn Sans", data: bodyFont.buffer.slice(bodyFont.byteOffset, bodyFont.byteOffset + bodyFont.byteLength) as ArrayBuffer, weight:400 }] });
}

