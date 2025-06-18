import Image from "next/image"
import React from "react"

interface Props {
  variant: "default"
}

const Wallpaper = ({ variant }: Props) => {
  const getWallPaper = (variant: Props["variant"]) => {
    switch (variant) {
      case "default":
        return (
          <Image
            priority
            className="object-cover h-dvh "
            src="/wallpapers/default.jpg"
            alt="wallpaper"
            width={4096}
            height={2160}
          />
        )
    }
  }
  return <div className="absolute inset-0 -z-10 h-dvh">{getWallPaper(variant)}</div>
}

export default Wallpaper
