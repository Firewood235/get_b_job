import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import styled from "styled-components";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
// import { Icon } from '@iconify/react';
// import { Scrollbars } from "react-custom-scrollbars";

const style = {
  width: "100%",
  height: "500px",
};

type ContentS = {
  user: number
  word: string
  side: string
  image?: string
  // rememberContent?: RememberContentS
}
type RememberContentS = {
  word: string
  complete: boolean
  side: string
}

const ChatPage = () => {


  const footRef = useRef(null)
  const [content, setContent] = useState<ContentS[]>([])
  const [rememberContent, setRememberContent] = useState<RememberContentS[]>([])
  const [phrase, setPhrase] = useState("")
  const [changeColor, setChangeColor] = useState("#e0e0e0")
  const [stop, setStop] = useState(false)
  const [remember, setRemember] = useState(false)


  const handleKeyDown = (e: { keyCode: number; }) => {

    if (stop) { return }

    if (e.keyCode === 13) {
      if (!phrase) { return }

      setContent([...content, {
          user: 1,
          word: phrase,
          side: "flex-end"
        }])

      setPhrase("")
    }
  }

  const handleSubmit = () => {
    if (stop) { return }
    setContent([
      ...content, {
        user: 1,
	// user:1が自分、user:2が相手(ユーザー間だったらuser_idとか入れたい)
        word: phrase,
        side: "flex-end"
      }])

    setPhrase("")
  }

  const replay = () => {
    const flag = content.slice(-1)[0]

    if (!flag) { return }

    if (flag.user == 1) {
      if (flag.word.match(/remember|覚えて/)) {
        setStop(true)

        setTimeout(function () {
          setContent([
            ...content, {
              user: 2,
              word: "何を覚えますか？",
              side: "flex-start"
            }]), setRemember(true), setStop(false)
        }, 1000)
      }

      if (remember == true) {
        setRememberContent([...rememberContent, {
          word: flag.word,
          complete: false,
          side: "flex-start"
        }])
        setRemember(false)

        setTimeout(function () {
          setContent([
            ...content, {
              user: 2,
              word: "覚えました",
              side: "flex-start"
            }])
        }, 1000)
      }

      if (flag.word.match(/教えて|notify/)) {
        setStop(true)

        setTimeout(function () {
          setContent([
            ...content, {
              user: 2,
              word: "こちらです",
              side: "flex-start",
              rememberContent: rememberContent
            }]), setStop(false)
        }, 1000)
      }

      if (flag.word.match(/こんにちは/)) {

        setStop(true)

        const num = Math.floor(Math.random() * 2)
        const kuji = ['こんにちは', 'どうかされましたか？'][num]

        setTimeout(function () {
          setContent([
            ...content, {
              user: 2,
              word: kuji,
              side: "flex-start"
            }]), setStop(false)
        }, 1000)
      }

      if (flag.word.match(/画像/)) {
        setStop(true)

        setTimeout(function () {
          setContent([
            ...content, {
              user: 2,
              word: "どうぞ",
              image: "任意の画像.png",
              side: "flex-start"
            }]), setStop(false)
        }, 1000)
      }
    } else if (flag.user == 2) {
      if (flag.word.match(/どうかされましたか？/)) {

        setTimeout(function () {
          setContent([
            ...content, {
              user: 2,
              word: `${"覚えて と送信したあとに打ち込んだ言葉を覚えます。教えて　と送信すると覚えた言葉を返します。"}`,
              side: "flex-start"
            }])
        }, 1000)
      }
    }
  }
  
  useEffect(() => {
    replay()
  }, [content]);

  useLayoutEffect(() => {
    if (footRef.current) {
      footRef.current.scrollIntoView();
    }
  }, [content]);

  return (
    <>
      <Span>
      </Span>
      <Scrollbars style={style}>
        <Display color={changeColor}>
          <Column>
            {content.map((phraseArray, index) => (
              <div key={phraseArray}>
                <Phrase side={phraseArray.side}>
                  <Background>
                    {phraseArray.word}
                  </Background>
                </Phrase>
                {function () {
                  if (phraseArray.image) {
                    return (
                      <Phrase side={phraseArray.side}>
                        <ImageBackground>
                          <ChatImage src={phraseArray.image} />
                        </ImageBackground>
                      </Phrase>
                    )
                  }
                }()}
                {function () {
                  if (phraseArray.rememberContent) {
                    return (<>
                      <Phrase side={"flex-start"}>
                        <ListBackground>
                          {
                            rememberContent.map((rememberArray) => (
                              <div key={rememberArray}>
                                ・{rememberArray.word}
                              </div>
                            ))
                          }
                        </ListBackground>
                      </Phrase>
                    </>
                    )
                  }
                }()}

                {index === content.length - 1 && <div ref={footRef}></div>}
              </div>
            ))}

          </Column>

        </Display>
      </Scrollbars>

      <InputFormArea>
        <Form>
          <TextInputArea
            onKeyDown={(e: any) => handleKeyDown(e)}
            onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPhrase(event.target.value)}
            value={phrase}
          >

          </TextInputArea>
          <SubmitButton
            onClick={() => handleSubmit()}
          >
            {/* <Icon icon="fluent:send-16-regular" width="20" height="20" /> */}
          </SubmitButton>

        </Form>

      </InputFormArea>
    </>
  );
};

export default ChatPage;


const ChatImage = styled.img`
max-width:90%;
object-fit:cover;
`

const Span = styled.div`
height:50px;
width:100%;
`

const Background = styled.div`
background-color:white;
height:100%;
min-height:45px;
padding:10px 20px;
border-radius:10px;
display:flex;
align-items: center;
text-align:left;
max-width:70%;
`

const ListBackground = styled.div`
background-color:white;
height:100%;
min-height:45px;
padding:10px 20px;
border-radius:10px;
display:flex;
align-items: flex-start;
text-align:left;
max-width:70%;
flex-flow:column;
`

const ImageBackground = styled.div`
height:100%;
min-height:45px;
padding:10px 0px;
border-radius:10px;
display:flex;
align-items: center;
text-align:left;
max-width:70%;
`

const Column = styled.span`
width:100%;
height:100%;
margin:0 auto;
display:flex;
flex-direction: column;
justify-content: flex-end;
`

const Phrase = styled.div<any>`
width:90%;
text-align:right;
min-height:45px;
margin :0 auto 15px;
display:flex;
justify-content:${(props: { side: any; }) => props.side};
align-items: center;
`

const Form = styled.div`
display:flex;
width:90%;
height:70%;
justify-content: center;
justify-content: space-between;
`

const SubmitButton = styled.button`
margin-left:15px;
width:80px;
border-radius:10px;
border:none;
color:#666666;
padding:2px 0 0 2px;
`

const TextInputArea = styled.input`
width: calc(100% - 80px);
border-radius:10px;
border:1px solid #e0e0e0;
background-color:#fbf9ff;
  text-indent: 1em;
  &:focus {
    outline: none;
    border: 2px solid#666666;
  }
`

const Display = styled.div`
width:70%;
max-width:600px;
min-height:500px;
margin: 0 auto ;
background-color:${(props: { color: any; }) => props.color};
border:solid 1px #e0e0e0;
border-radius:10px;
display:flex;
justify-content: center;
align-items: flex-end;
padding-top:15px;
`

const InputFormArea = styled.div`
width:70%;
max-width:600px;
height:50px;
margin:10px auto 0;
border-radius:10px;
background-color:#e0e0e0;
border:solid 1px #e0e0e0;
display:flex;
align-items: center;
justify-content:center;
`


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainxss}>
        <div className={styles.sidebar}>
          <div className={styles.rooms}>ルームA</div>
          <div className={styles.rooms}>ルームB</div>
          <div className={styles.rooms}>ルームC</div>
          <div className={styles.rooms}>ルームD</div>
          <div className={styles.rooms}>ルームE</div>
          <div className={styles.rooms}>ルームA</div>
          <div className={styles.rooms}>ルームB</div>
          <div className={styles.rooms}>ルームC</div>
          <div className={styles.rooms}>ルームD</div>
          <div className={styles.rooms}>ルームE</div>
          <div className={styles.rooms}>ルームA</div>
          <div className={styles.rooms}>ルームB</div>
          <div className={styles.rooms}>ルームC</div>
          <div className={styles.rooms}>ルームD</div>
          <div className={styles.rooms}>ルームE</div>
        </div>
        <div className={styles.writing}>
          <div className={styles.toolbar}>
          </div>
          <div className={styles.write}>
            <div className={styles.message_area}>
            </div>
            <div className={styles.toolitem}>
            </div>
            <div className={styles.settings}>
            </div>
          </div>
        </div>
        <div className={styles.reading}>
        </div>
      </main>
    </div>
  )
}
