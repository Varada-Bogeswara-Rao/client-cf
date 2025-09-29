"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectWallet } from "@thirdweb-dev/react";
import GlowingCard from "./components/UI/glowing-card";
import ScrollingMarqueeSection from "./components/UI/marquee";
import { HyperText } from "./components/UI/hyper-text";
import Image from "next/image";
import Card from "./components/UI/card";
import SectionDivider from "./components/UI/section-divider";
import { WalletMinimalIcon, Rocket, HeartHandshakeIcon } from "lucide-react";
import { LucideRocket, LucideUsers, LucideShield } from "lucide-react";
import { Timeline } from "./components/UI/sticky-scroll-reveal";
import { InfiniteMovingCards } from "./components/UI/infinite-moving-cards";
import CanvasBGWithText from "./components/UI/canvas";

export default function HomePage() {
  const sparkTexts = [
    "SPARK",        // English
    "स्पार्क",      // Hindi
    "スパーク",     // Japanese
    "스파크",        // Korean Hangul
    "سبارك",        // Arabic
    "火花",         // Mandarin
    "স্পার্ক",       // Bengali / Bangla
    "CHISPA",       // Spanish
    "ÉTINCELLE",    // French
    "FUNKE",        // German
  ];

  const router = useRouter();

  const connectBtnRef = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showWallet, setShowWallet] = useState(false);

  const features = [
    {
      icon: LucideRocket,
      title: "Fast Transactions",
      description: "Experience near-instant crypto transfers with low fees.",
    },
    {
      icon: LucideUsers,
      title: "Community Driven",
      description: "Join a vibrant Web3 community and collaborate on projects.",
    },
    {
      icon: LucideShield,
      title: "Secure & Private",
      description: "Your data and funds remain safe and fully under your control.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[70vh] relative">
        <Image
          src="https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fhero.0cfd42cc.png&w=1504&q=10"
          alt="An illustration of a futuristic city, representing the Ethereum ecosystem."
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* HyperText */}
      <div className="px-4 pt-4 pb-2 flex justify-center">
        <HyperText
          texts={sparkTexts}
          className="text-center text-lg md:text-xl"
          style={{ color: "hsla(263, 77%, 75%, 1)" }}
        />
      </div>

      {/* Headers & Tagline */}
      <div className="flex flex-col items-center gap-y-2 lg:max-w-2xl text-center px-4">
        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl">
          Welcome To Spark
        </h1>
        <h4 className="max-w-96 text-md md:text-lg lg:text-xl text-gray-400">
          Your home for decentralized innovation
        </h4>
      </div>

      {/* Feature Cards */}
      <div className="flex w-full max-w-6xl px-6 mt-10 gap-8">
        <Card
          icon={<WalletMinimalIcon className="w-10 h-10" />}
          title="Connect Wallet"
          description="Link your wallet to start using Spark"
          selected={selected === "eth"}
          onClick={() => {
            setSelected("eth");
            setShowWallet(true);
          }}
          color="#3d4ceb"
        />

        <Card
          icon={<Rocket className="w-10 h-10" />}
          title="Create Campaign"
          description="Launch a campaign and raise funds"
          selected={selected === "b"}
          onClick={() => {
            setSelected("b");
            router.push("/create");
          }}
          color="#0f9972"
        />

        <Card
          icon={<HeartHandshakeIcon className="w-10 h-10" />}
          title="Donate"
          description="Support campaigns with secure crypto"
          selected={selected === "c"}
          onClick={() => {
            setSelected("c");
            router.push("/campaigns");
          }}
          color="#6c24e0"
        />
      </div>

      <ScrollingMarqueeSection />


      <div className="w-full px-3 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-1 mt-18">
          Why Choose Spark
        </h2>
        <div className="flex justify-center">
          <SectionDivider className="my-2 w-1/2" />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlowingCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.1}
              />
            ))}
          </div>
        </div>



      </div>
      {/* How It Works Section with Image */}
      {/* How It Works Section with Image */}
      <div className="w-full px-6 mt-6 flex flex-col lg:flex-row items-start gap-8">
        {/* Left side: Header + Timeline */}
        <div className="flex-1 flex flex-col items-center lg:items-start lg:pr-8">
          {/* Centered header above timeline */}
          <h2 className="text-3xl md:text-4xl font-bold text-center  mb-4">
            How It Works
          </h2>

          {/* Timeline */}
          <Timeline />
        </div>

        {/* Right side: Image */}
        <div className="flex-1 hidden lg:flex justify-center items-start overflow-hidden ">
          {/* adjust h-[...] to crop more/less */}
          <Image
            src="https://i.postimg.cc/bJ2LgPby/download-3.png"
            alt="Ethereum learning illustration"
            width={500}
            height={600}    // original image height
            className="object-cover object-center"
          />
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-1 mt-15">
        Featured Campaigns
      </h2>

      <div className="flex justify-center">
        <SectionDivider className="my-2 w-1/2" />
      </div>
      <InfiniteMovingCards
        items={[
          {
            title: "Decentralized Education",
            pledged: "5 ETH",
            donation: "3.2 ETH",
            date: "Sep 28, 2025",
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUREhIWFRUVFRcWGRcWFRgWFhYXFxcYFxUZGBoYHSggGxooHBoVITEhJSkrLi4uFyEzOTMtNygtLisBCgoKDg0OGxAQGy8mHSUtLSstLS0tLS8tLS0tLS0vLS0tLS0vLS0tNS8tLS0tLS0tLTUtLS0uLS0tLS0tLS0tLf/AABEIAKkBKgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAEEQAAICAQMCBAMHAgQEAwkAAAECAxEABBIhMUEFEyJRMmFxBhUjUoGRoRQzQkOxwRYk8PG00eE0NVNyc3SSsrP/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQMCBAYF/8QAKxEAAgIBAwMDAwQDAAAAAAAAAAECEQMhMVESExRBQvAEMlIiYcHRcZGh/9oADAMBAAIRAxEAPwDsG8Q5AIJrywSzs4uMm2ABAII4r9jzjn1saghSekgtERAbYNGebNfyKGZWGYs9F2IEkkzMxYsST1Pc31wEzBSl+kkEih1HTnrkeGIrSDDDDAYYYYYAGGGGABhhhgAYYYYAGGGGACE40nFJxhOaSMtiE4xjik5GxyiRKTEY5GxxWORscqkRkxGORMcVjkTHLRRCTEY5GxxWORMctFEZMRjkbHFY47UaZ0VHZSFkBKE16gDRr9cokSbIGORk5Yh0kj/BG7dfhUnoNx6DqBzlUnKok2BONyxDoJX5SJ2FXYU1V7bv2vi8uN4BMt+ZsjoScPIoNxVuUAEndzx74OSXqZMrDNSTwGbzPLiUzcqA6BthLruAtgO1/tmYykEg9RwfrjTT2ATDDDGAYYYYAb332/5V/nD77f8AKv8AOZWGcvj4uDt8nLyav32/5V/nD77f8q/zkXgECvqYUcWrSoCD3BPIzWmhhmj1BWBIm08iAFC1OrSFCrBiee9jMSxYk66RP6rLyZ332/5V/nD77f8AKv8AObX2n0sCNJFGulUh1UBTJ562R2Ppv3+WVfFxBHJNpV0m7y1IEilvN3AAmRuo2c9KqqzKx4ntEXlZeTP++3/Kv84ffb/lX+c2/ENNp44Y6TShm0yOfMMnmlmXkqB6evT55b8O+z0Ev9GyqC3lxvOnPrSQMA/1DCjXuMXThStxDy8nJzP32/5V/nD77f8AKv8AOaHhcsP9NO7aWJmg8qid9t5khU7qb29s1PCPC4Xi07eTpz5gleQO0glKLIwPlKp5pf8AQY5QxLePzcH9Xl5Ob++3/Kv84ffb/lX+c2fsr4NDK00pieWHzBDGADYDtfmGvyptP65nP4YI9Pqt6jzIZ44w3sCWBr5Ggcfbw3VcB5WXkr/fb/lX+cPvt/yr/OT6DTp/Seb5QkkGrRADZ3KY72UD0JzZk0+m/qNNpTp4hKZAZvLLbVsGo+WNnoSfliePEvaHlZeTnvvt/wAq/wA4n32/5V/nNqXTQtPBGE0pVp1VhCZC226pt/FfTvkGtghlj1W2FIm0zDayFqZfMMZVwxIvuCMFjxfiLy8vJl/fL/lX+cQ+MN+Vf5zW+z+lh/ppJXWAsJlQNOXC0UsgbObv/fCPyVh1M5ggk2TRIoBcxAMpvbyDXF84+jHddIvJycmOfFm/KP5xv3o35R/Ob+p8Oh2TSLGF3aGLUKtk+WzvR2k8kcXz74zR+Ewsumdo7/5bUTuoJBlaNjtUnt26e2arHV18qxeRk5ML7wb2X98Q61j0AP75Zn26gRCLSiJ2k8vcm7ymuqFNdMLs89M3PtN4VHpxHNHpvQjtC6yBqkKj0y8EGj6ufkM1UE0q1MvNPk5U64+wyfSeKugbbGhuuWXcV2nda30PvnUvpdOdbDphpo1RlDsRutt0JfabbpfP6DM0rBp4tNenWYzr5jFixoFioVKIAIrr7nBOD9vz4jDySZmyeJKzs7xKzMzE2xHLDg0ldDzianxIOu0QxopZG9CkNwu0gMx4B61750//AA5Bt1MINOJ1SFieQxj8xUJHvyt5z/2p0SxT+WibQIo7FE0xRWbqet3jhKEnSRnqZTi1UajmFWNDlnbqrWeF9xxXtirrSryMiqokV49oUbVV+aXfe369cqX/AK+/uPliD3+h6exo9ct0oVm0ftG7Nvdd5Lq53SSUSY/KYFUIHIr/AE6cZWi8YkQDYiJQj5SNVJML7lYlrO7nk9+Mzj7X2I6+xsdMK/19vcfPF248CNWXxssCrJusTL6pJG/uNvvaCF4Py+vTCL7QOH3qqIN+4iNFjHqj8tgCQTRH82cxju/N7Hg/p2xgJGHbiFGrq/Gi0ZjK2Ssa7jLIxUxE0wBNAkGunHbMfHyMD27++MzSSWwBhhhmhhhhhgBZwwwyZYm0mpaN1kQ0yMGBq6I5HBy5rvHppV2syhdwYhERAzDoW2gbv1ypopQrhm6C+wJBIIDAHgkEg18s0F8VVdxVd7ERi2FbtofcWAPfcoqze3nMSWuwmN132hmmDLIIju6kRRhv/wAgLwl+0WoaMxlx6l2M2xRIyj/Cz1ZGIPE1qJSnpQLZPJsKRagmupv50LybT+KojWQz8ICxG0ttZixIDexUUSb285mkvaIj/wCI59oQ+UQqBAWhjZgoFAWReR6bx2eN45EemijES8Ctgvgjv17/ACxIPEABGrElUkZiKFbSFC0L7U5r55Z0etiRgGQsg8kElVDUhdiw54NleL5AINXg0l7QM2LWuqSRgjbLt3ihzsbcvPbnJU8VlXyaajBflkAWNzbj9effJtPrwgG2x+CVNfm3uQf03DJ4Nciq6+pSUjUEL3RGDdHB5JB79Omaf+BWVdT4pLIoUtShnekXZ6nNsTt/6GWV+0s4Lm0Yybd26NGDbBtQkEda75DqtUjRIgvctduANpDd+STXQD52ecli1yDy7BIUxHbtWl2f3CpvktzxQ689BiaVbAEX2gmVtylF/EEtLGoG8J5dgVQ47e/OPk+0cxKv+GGVg4YRRqdwvqQLPXKWm1o89ZZOgIJAtugr/EbP75dXxFAXJLEFlNbR61CEFG3OSBZHvicV+Imhsvj8zFWqMFH3grCincORZA5HyyHxLxyaZdjMoViGIRETc3YttAs/XF03igBh3liI1cHvyysEI5B4sdx0wOvSnG5wWJNhQd4KgKrbmJABs9+t9QMdK/tCiPw/xmWFGjTYVZtxDxq43AVfqB7ZJD9oZ1L7RHUhUsvkoVtRQpaoce2RavUq6bVjo3F6uedkRVrs0OeeOvfE1erjaOJVDbkFHgAGx6uQbJ3fQV2uyX0p7oZMnjk6ytOXtmGxrRSrIQPSVIrbwOK7YSeOztIk28BkUBdoAVV5BAUCq5Nj55L94J+Hyw2RFeEPpYQ+XuFvXDc8AfvjDr0trBJAGw0LMgj2lmAugSd/flB7k4UvxMjn+0Wo3I4ZV8vfsVY0VFYii22quj1yoniMgR4t9pKRuDW/TlSL6G/bLp8SS42AJ2JVUQNxh8sEEv8Am5sAe/XE+8oz5pII3qOALNqhWib9zdkG+vBw29oiuPGZhMuo3DzFVQDtUCguzp9MfofH54kEaMpVSSu9FkKG+qlh6cZrNUrR7AD/AIQAVVRHtX1Ubs7jz0H74+DxSvKslvLD8WTyyuE6EdLHzHbHSa+0CF/E5SrIXNPL5pJoN5lGmvr3OM8R8QeeQyykMxC2QvsNvahlw6+ImRijfiBR/hGwKtXZssd9G+CdvzIxx8SiOz0UymMEhQwIjiK3QI9W4+4sAHg4ba9IGNdD9PcD4T8sWr+fUdCeoscnNRvEEEm9dw/FR7pVJXZtfuTyb6k8dTeMi162Gay26Vt1biN6KiEWRZUgmu3Y3mup8AZwb5+x6gdRXbEA/wBPb8p+ebUHicSs29CwLRm6QNcSm2q+rMbI7hj3zGA/19ieo+fzxpt+gAx7X7jr+o6ZGGDdeLPb/wAziyHivevavY9MjCHtz8+3GaAaRiY6Q2SRjcYBhhhgAYYYYAdJ9yL+c/sMPuRfzn9hmrhnxPJy8n3/ABsXBlfci/nP7DJYfs4XvaWNVdAcWaF/rm1Do2oOwGwgty4XcqkBgO9/pmmumXlUVTfmJ6RJLfAdKPAuh1/WsfkZeSGSGGOy+f7OYP2Uq90qqRv4LLdp1FC+fbLUf2OQmvMkb1bfTFQNpuU25Azow9Ec7QWVqLRxLtlTbfpBYcjIlFgGg1KjH0PLflvtblyAOP07cY/IycnO4Rfoc7/wtFx+LXEZ5ZSaY0fSgPQ/rkg+yagE75DSueIwoHltR5ci+Off5Z0EtrabitCVKLpHVEOlCME/pfXuMcsYZr22C4/y2c1KnXdKQPi9/r8sPIyci7cODm5vsxECR59AMy8sGPw7lNIOnbr1yjqPA47G2UsCASdm2jXI59vfOr1HqjKs1WsZO514ZTsakQc8VweeO+Vx4V15ckCTom0bkory5HBFn3HzxP6jLyVx4sK1kYcH2YUru84fCWoAsw2kAggDjjn6Ymu+y+yzubYG2hioUk1u+EmxxnUxqoqMN6dxUBpSTtkjvlYhyNw9/YfPGaeQE7lq18pmKxqCpvY4LSk/Lnpftj8jJyZ6IXfTp/exxp8FX85/YY0+DL+c/sM2dUm12X2YjqD39xx+2V2bBZ8nJ1djFV0Zh8IX8x/YY0+FL+Y/sM0ScYxyizZOSbw4+CFvCIwY/wASw20ttFleaIo0Ca7Zb1P2YRbBcqR5o/EeNOUopQBJsqenv3ybQ+HeaAd9WxSgju1hSw4Armq6/PJtTqDp0VUaRXbbMhKxgepCj2eW9wB/3zfdntZxzxwukVYvsujMB5jsC6j0RM3pkTcrb32r8VLz9chbwJAATJtO2NiHkQGy5SSlSyQP36/TIjqJfSzFmAK0HtkPlnhSDwQOlfP55Zg8ZYbgwpSkqhYgsdeY27qBe0GuOw/nfXk5JvEYmt0flu0d3tJW6PNHg+rnJvD9GkjLGXKszMLPwcj0ilUm7Ganh2vi+OdkZ/OBJeJpndChVuSdtDg0eb+lZfj1dRK28geVGw3Sxw7jBJRoRAv8J789etDNvJInJLg5rU+HJE0Rd3KOockRlSOSGC+ZQYj36ZYTwyN0DJKOUkYKz2/4bCgUjU1am+T7850Eul3WqoGP/MRg+TJKQT+NHUkxAur561fW7xTqQWFuQGkRgrzpESs8W0+nTKT8Qvr7X1Jw7sjDMofZtbq5W/EKbvKWEHdF5iH8ZgR369v0uqvhKNREy8iFjRMzDzTsYFYl+IGuLvoO+a8cfAk2WVSFyw05LAwybJak1DV0qyBXTpXJqH4MW+yF1EYVtRRBRhLF+HplrpfF116UBgpy5MmW/gSqm4+bwkrWUjiFwSbX/uNu6EcVd9utNPgas5RZg34jxjZv1BP4fmpQiWueQaPY+xzaWAF9wj9LS8smnVGKaiHj16puRvFcj3PcDIU1lhWZwzBdNI3/ADDuVZGMMp8vTqB8NdTdDvfD65Cszx4Kg2sTIqkad9zeVCoScFb9TFq3A9ugN++Vl8HUru826RmIjSSf+1JsflQFAog3dfMXmydMUVtsZWknUFYI4fVDIJYizaglvh56WKHWryV5FkcjeHDSuv8AdmnO3UQ7q8uABa3jt347Xh3GBlar7PIpKsWWnlS5WhhXcEEkfG4typ7juM5gHNbxnxAMBGgQAiNpAIBEVlRSrLZtj8zxZJ4zKKGt1GiaujRI6i/fL47rUY3DDDKDDDDDAAwwwwA7nDDDPOnpjQ0esRUAN3bg7VSyrL+Zge9fpkWs1rObthwLBcm2C7S37ZUwx2TWKKl1epf8LkrzACR6d3BVeUIYcsL/AG5zSZQ5IsNbOv8AmTcSLvFdBd/+fbM3wiNt4f8Awg7WIKit4IHx8ZoCSwCSCQsbfG8nMbbW9K0On8fXGjlz/e6Ho+3a3wC4nq44h6gY2PFtX/rkW0bezUn5ZJf7L+5pQKP0r2vHtGVBABXiVbCpHyCHT4rbp+vTHWGbswL+8ktCVPYUPi/n6YyN+vzQJBRKXt5lSi0cYAdRIvCAmv46D5YiUxDbbto3+B5P7i+WbaQ119+/0xEYqA3K8RN/lxi1Yo/u3T/fjKevnAXaNrGnjPqdyoV7Qgmh06VhY4xcnS+ciyeIhPR+JahFI3KgDRMfyD24u7/jMqd9zMwFWSasmrN1Z5OMJxCcR3RxxjqhrNkeLjGbKJGXIVsY2MJyInKxiSlIv+GzuGUDcUDq7KNxXg0WIX5HNiaEqGCqV9My2I44vVGwkjsykt059+nXrlbRaXYChK+Y3mRNUzG90YeM7YwSR2+ZyxH8QkC9XgktYQpAmQwn1zsbF9+RfOa9T5+Wab0B9kj0drgynq0uooTRWDtQBb3jtzf0vMoeERhVaQSVtic7mjiXmQpMDZLUOKIHvfbL/nUtFrKRrwZmajpZaNrEKoqeLPTm++Pm01FlClbOohsRJFy6idAWmO7oOO4HTNLQk5NIoroYgGCRxsQswBAl1FtFIGXoAotOL6V161hLq2TVnTkiON1kriPT8TIG5NNS2BQu+Bl0agO4YsG3PE5uSWbiaPyyCkQC3ur+BlHW6U+Qy7dtwr/lxQqW08pRyxc7yeRdUTm1q9TFk6SB9rlQ9/08htJtTd3DJZek/wCqB4zn5PB5Y3Zw6RbGlZSzqj3C3ICqSQ3ShmlpdxvSld+yKWMSKZp43biVFRVoAgA/Luck13iqQONyyLvPmhY44oQY5YdrUfUw9Q6f75SNp1Eyc34ysiyMjymWuQ1ttO+nJG/nkm+nJzX8K+0JZ1WQm2nRvS/kRAFPKa/LXcDVdP8Avz2p1LyHc7MxoC2NmgKAv6YyNyCGBogggjggjkEfPOhwTjTEdmIaSwgYpFdiB3IOkm5IecgfCeaHTiu2c/4n41IzOscsgi/ECg7UOyVt7ghOOW5rNnwCQzopceY3nujFonmNTRnnlhGPWB7Hv9eSdCpKkUQSCPYjg5jHFW7BHU+GeLxySgsio7ahSFWNZHIePyn/ABJ2Iq6NN35+lmeQmIp5xDLCov8AqCWjOmlKE7IFo+k8We12eucbG+0hvYg8gEcG+QeD9M3/AB2GSKWeaOTYrkIV3xiVllQObWL07Pp8sUoLqAyfFdIYpnjJLbT8TIyFr5BKtyLvvml4aizQLp2kCEagbbaR2p1o7IVFNzXN3zmdBpJ9QWZQ0hXbuYtdbiFXczH3ofpmn41HIF0/qJliV4yFkVmTyW4IEYtQBzZJObl6RvUDEnjKsym7UkGwQeDXIPI+hyPNSLwPVSN/aa2YC3O22ZS4suR1Xm8z44WY0qlj8gT1NDp8+M2muRkeGWdV4fLGqtJGyBiygsKsoacV1sHjHw6BnRSjB3ZyghWzLwu7dtA+HHaEU8MXExjO5wwwzzp6YMMMMALeh1CpuvqQCvpVjuVgRyegzXc2Su67aRaMhJqRd49MQrr/ADnO5tabXBh1I2iIm32C1O07Qgsij9c0jk+ox+5fPQsR9Q+2uYnsRqtbwYz6pCeL/S+checBaLjhQADIzcxScCkocjp++SGHggLzUqioz1U709Uh9r+de+Y+skEkhZAx3HgEDcSfkorr7YMligps04542YohHPnC1RIwVb1C2ez1Fe4GYs+oLsXYlmPUnqe2WNFKqNvYsGVloBQe/rvd0NdOOuMbTqbfzFUHeQCbf0ngMFHBN/Tg4bl4pY5fyVDjSck1aqGIRt68U1bb454PTnjIN2bSNuQ1jjcCcjZ8qkSbEkbtkTYmNZsskc7lZ1MWrpVffXpgkoypHyjGN6EQ3VtP1q+vTGvpzTBUBISdB+CzUY3EkfrmIHw30HTtzlHwrXKVWDcVYpMllkjTa4DC22lidw6H5Vl19Qn95gCoaKViY5Z6WRDE1lyF6j9/pWKmmcUtGSySgvtL8NIygNMFO3UQ7vggHTeP9B3vK8N+mXZzWnlLCHkEMYpRvnbsK5qrrpV5T03iyFSFdh5cURO90hDGCWwF2KWYlT73168ZdfSbyyKu4k6mIVFJIfWBPHTzECwLo+1nm7zXTW5NkckhClN1lY5VCmck3p5d8YKQLV0TXPubFZK2n9RAQ00kiblhSO1ni3j1ahr+Ie3vzyBiDVgspL0rPFJtaZY7WeLyzSwLfUDv0r3OV0jpA+yyscblhASb00uyQ752q6IuhXQUKxpGLJE1e4qzOGJOnlI86ST4gYHtIVAvpxfsObrM/wAWKxQFWRlDo0IKwIgLwy+ncXJfoeTwegy9qG+KLfyBqIwpn5uxNH6NOv14ur9qzlPH5kednjYMrU3pDgBio3CnJN3dnvlccbYGfiYYZ1jJEmYAqGYAkEgEgEjoSPcZHhhiAM6Lw3X+bHLHKV2rHCdu5IVZYX6GlLM1MenP8ZzuGKUVIR1+m8GCvMEphJ50SoIXlVCFEse132gmu59vnlN/tEfPtPMeEknyxthYu8YRqMQ4F1x3r3OYup8QmkJLyuxJs2xPIXaD9dvF+2WV8cnVQqOEAVF9CqpIjbchJAvcDzeT7b9dQLWjfVqjP5G+tsvmSoXKrCdp2lz8IsAjnI9V49I0caq0gYBg9FVRl8zeiqEAIAN9/plrQeGSakK0ssxLSOu3y5HILIZQbJC+ojp+uLN4HFsFMUZhAwaaWMUJCVf0JZIDD6gdfmrheu4Es/jUI1FUhiJdjJHGWk/FjplHnk3Tdz8/pmT4l4oXkSVGkV1jRSxYBtyrtJUoBS1x75qQeDbYZhxIzRyMCIHOwwSANskagAQbJA6cfXB12jeFzHIAGWrAIYcgEcqSOhGOChegEGJhhlhnc4YYZ509MGGGGABkkUzLe1iNwKmu4PUZHhgDV7mtH4ghO5wAQ6mirSkjbtfljXzo/wC2MSdGprO6NBRZhH8DcBdgskr+vXnMq8Q5qyDwR9C94hp19UqNuUyleA20WNw9bdTyf2ynBFuYLdWQLokCzXbFhnKsCKNG6YWpPzHfNCDUSFCWZQpjYKBIsfMTBxwosm7ocfXNJamJSlCNblA+Hy8kIaAc2RtG1DtY+quhI+eV5tK4cx1uYGvR6uavjb14zovJDNQXcDIw4jeQ1LHuBDzEC93vXvkf9TW0l6/suQZlQ2bielhF9P1AyiOXyJHKtjGzf1XhoZfSpBRJfgiZQWjbqzSEbvSb45HtlCPwdt21pI1O7bQbe1lN4NIDYPT65VNB3Ysy26ZFuyXVRutbkKhhuBII3D3F9Rle8vFGGx2m1LxuJEbaymwR2P64k2skYU0jEUFosaoGwK9geayPImkGUSIuiNjnSeBatpA7SXIyyQv643mJF+W3+LaKWvi69PpzBbNL7Pnc7xVfmRSKBskkJYDctLGQSeOpsDrm5x/SRkzopSY0Klim1JVppIYBenl3x0IwWuj0u76Hvj204kcqFDhpJUFRSz8TxeYGDzELe76Hvio+1g/Mas8UnAg0ybNREYyedzgbh29ievOVUYFAxp6jic8T6qzp5Skh5pANpF9q44u8gSI/EtY6ws6yNG+2CYfiwxtuKmGTYkQs8CuSCB1zjc7rVRbFkiYmMEamIhm0+nTqJoxS25FHofcAEXmJ9ldCHYSH1esRFDpzKAJFIVySQgO6gAT88tjkoxbGYGGPljKsVIIKkqQeoING/njc6BiYYYYAGGGGABm34b4E+9G1Ee2I7LuRIzUoPltbdrHt2zEzsfD7/p0kVKPkE7kiiT1aaQMCZJWO40eSo7Dg1kskmloJk6S7lDGnISFzzPqbMMhjkJApB6T06V35vHzIY1ZeY6Goj/yNOto4mirq/Tnn5UcZrdXFbLJMlFp0ttRJKdsyCQHZCAtbuOO5+WJ4drkY+ZFQCyQM5jjhgVDIhhcEylm/UWOSeOuc9Or+fsInCrI/QOGl/LPqgF1EPXc21PjHy5+mc19pYiDC5UqWhUEFY19SWjUsZ4Fj/FzmzNq0WMF5ENIqjdLNqAz6abgUu1OVPS6r2vOX8UZDNIYyChclaTyxR54SztA6AX2ymJOwRVwx8MTOyooJZiFAHUkmgB+uOm07KxRhTKSpBIsEGiD+udBo7TDDDPPHpgwwwwAMRsXGk4AGNJxSciJzaVmJOhbzW8InpR6qCyi/WkYqRShtiC37cVmOTiwa10vaavbfAv0kMKJHBsdsokc2ZdUaNtaK2QGpFY+mWezBJTG2pQNp57VxxePnBTcm4p/ejovFCBdSpQQFv0PuAKxGmR5Nm9WLPIoG+Sc1LHvJCrQ+LrXf6XhHIV2vyn9mTjyoVF3FJzy1fT52M3R89sAgdgdoYGRG/tyTcTR7PjlIX4vfv9KyHzyijcxUhYjTTJF6onKOAIQW6fr161iMAVI4crGw/wA2fmCS1HZQNp+le15LKNpKWUBaWPloYF2yxiReFtqsf6D5ZpE2YP2g2elQRuRpFICyWF3bkJaQ+rg8cD+cxic0PHZ1aQOrA7kQtTu5DbaYFn5vj6DMljnVCOhtOkMkNnGY5jkbHOhIm2I+TaDV+VIkgAbabokgHsQSpByuTjSc3WlE2dhoW/AWVE2XC5uOOGMb9PKHW5JSWbi+QL4HWjVuQrI5XcHDSSp/dn1PE8fmikiAT4genf6XnO/ZzXVJFCUWjI3qCRmX1oU2hpfTt6Gjm6NV6QWkBKRwsQdQzbTBIUe0gWvh9z05s5yzi0zDMzx+VViCFCjSrDMoWCOJLClJL5L9vfkk8ZneDatESYOU5VXQOrsGeNwwWlIHPItv98j8Z1Su+xBHsjZwrohQurMWG7cSTXQX0GZ+XjH9NDJdTLvdn2qu4k7UG1Fvso7D5ZFhhmxhhhhjAMMMMADL+j8VaNQqxxWrMd7Rhn9a7SpLcbe9V1yhhiaT3EAx0blSGHVSCPkRyOuNwxjNr7U6t2mK+aXjvzFBkVwDIoLfAAoN3wBxmREm4hRQsgWTQFmuSeg+eMwzMVSoRqS6dYFYMYZXbeg2SMWhZGHr9NDnt/3GZZwwxpUB3OGGGeePThhhhgAhxMCcYTmkjLYOciJxWOMY5SKJSYjnIicVjkbHKxRGUiTSy7ZEb2YHv2PN1z+2dJJAV3KFK/347EccXPEyWZSWqv1AzkmOdXCfhlC//Ak3CID4rif1zMb7c8gn9820cWZi+aHe7DAyKeXlm4mi2kFYwF+IfvxlWdnjiLIDGwiRwQkUY3wuY3JDEsTz9Se2PeWlK7rKxsKMzMb08tqCsIroTVn3N5hfaSQiQxbFCqzOpEZjZhJTc7juodrzUI26IeplSOSST1Js/U9chY4rHI2OdiQ2xGOMJxScYTlEibYhOJhiZoyPhkKsGFWpBFgEWDYsHgj5Zen8c1DAgykKfMG1QEWpTukFKBwSBxmdhiaT3EGGGGMYYYYYAGGGGABhhhgAYYYYAGGGGABhhhgAYYYYAdzhhhnnT0wY04pyZtYaAoWNtH/5f+h+2NIzJtbFVsYzZdPiTd1U/p79cY/iTflXqT0Pf9cokQc5cf8ASkfbvkb5bm8QZjZC9b79wQe/zONXxNgbCrf0N9q5vn/1yqRKUnwUWORscfNJZJ9yT++QMctFEnIRjmt4TqDJ+D5YLCGRQQgdib3j42pao8jMVjk3huoVJkd6KhubUOK6H0nrlOnQhPVG743q28t2SQqd6uB5qBik0YDDZEK6jnn9M5SWUsbYkn3Js8cDrnUzShtOQHpWgYDc8UQPkSWlIgLE0eh688985iXSSBS7RuFBClipABIsCz7jnNYkiCZXY4xjgxxhOdKRlsCcYcUnG5swGGGGABhhhgAYYYYAGGGGABhhhgAYYYYAGGGGABhhhgAYYYYAGGGGAHc4hxcac86emEJxhOKcYcoibGk4xjjjkbZREZMYxyNjj2yJstFEZMYxyJjkjZC2WiiEmNY5Exx7ZG2VSIyH6bVvGxaNipKlSR7MKI5yPU6yR/jkdunxMT0FDr7DjGNkbZRJEmNJxhOOOMOUMMMTDDGIMMMMADDDDAAwwwwAMMMMADDDDAAwwwwAMMMMADJV0zkFgjFQNxIUkAXVk1QF8XkWejan/wB2D/7GP/8AqMnkn01+7Eec4YYZQZtajwPlSjhEZIGud41J84ldwCEnaCCfcDqMx9Sux2Q8lWK2Oho1Yvms6n7Df5n0g/8AGLl/xj/2ib/6sn/7HOfuuMul6iP/2Q==",
          },
          {
            title: "Clean Water for All",
            pledged: "3 ETH",
            donation: "2.1 ETH",
            date: "Sep 25, 2025",
            image: "data:image/jpeg;base64,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",
          },
          {
            title: "Healthcare DAO",
            pledged: "10 ETH",
            donation: "7.8 ETH",
            date: "Sep 20, 2025",
            image: "data:image/jpeg;base64,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",
          },
        ]}
      />


      <CanvasBGWithText />

    </div>
  );
}
