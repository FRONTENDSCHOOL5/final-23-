import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import {
  ModalDiv,
  ModalWrapArticle,
  ModalLineSpan,
  ModalTextBtn,
} from "./ModalStyle";
const { kakao } = window;
export default function Modal({
  type,
  modalClose,
  postId,
  productId,
  commentId,
  restaurantName,
  handlerPostEdit,
  handlerRecommendEdit,
  recommendInfo,
}) {
  const navigate = useNavigate();
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState("logout");

  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }
  function alertOpen(type) {
    setAlertShow(true);
    setAlertType(type);
  }
  function handlerOpenMap() {
    navigate("/map", {
      state: {
        restaurantname: restaurantName,
      },
    });
  }
  const initializeKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("cac39e5e6556a7917d1c0c5b966012b7");
    }
  };

  function kakaoButton(recommendInfo) {
    initializeKakao();
    if (!window.Kakao) {
      return;
    }
    const kakao = window.Kakao;

    kakao.Share.sendDefault({
      objectType: "location",
      address: recommendInfo.link,
      addressTitle: recommendInfo.itemName,
      content: {
        title: recommendInfo.itemName,
        imageUrl: recommendInfo.itemImage,
        description: recommendInfo.link,
        link: {
          mobileWebUrl: "https://foodzip.netlify.app",
          webUrl: "https://foodzip.netlify.app",
        },
      },
      social: {
        likeCount: recommendInfo.price,
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: "https://foodzip.netlify.app",
            webUrl: "https://foodzip.netlify.app",
          },
        },
      ],
    });
  }
  const UI = {
    setting: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn>설정 및 개인정보</ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen("logout")}>
          로그아웃
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    modification: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen("post")}>삭제</ModalTextBtn>
        <ModalTextBtn onClick={handlerPostEdit}>수정</ModalTextBtn>
      </ModalWrapArticle>
    ),
    product: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen("product")}>삭제</ModalTextBtn>
        <ModalTextBtn onClick={handlerRecommendEdit}>수정</ModalTextBtn>
        <ModalTextBtn onClick={handlerOpenMap}>
          카카오맵으로 이동하기
        </ModalTextBtn>
        <ModalTextBtn onClick={() => kakaoButton(recommendInfo)}>
          SNS 공유하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    yourproduct: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={handlerOpenMap}>
          카카오맵으로 이동하기
        </ModalTextBtn>
        <ModalTextBtn>SNS 공유하기</ModalTextBtn>
      </ModalWrapArticle>
    ),
    report: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn
          onClick={() => alertOpen(commentId ? "commentReport" : "postReport")}
        >
          신고하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    delete: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen("comment")}>삭제</ModalTextBtn>
      </ModalWrapArticle>
    ),
    chat: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => navigate(-1)}>채팅방 나가기</ModalTextBtn>
      </ModalWrapArticle>
    ),
  };

  return (
    <>
      <ModalDiv onClick={modalClose}>{UI[type]}</ModalDiv>
      {alertShow && (
        <Alert
          type={alertType}
          modalClose={modalClose}
          alertClose={alertClose}
          postId={postId}
          productId={productId}
          commentId={commentId}
        />
      )}
    </>
  );
}
