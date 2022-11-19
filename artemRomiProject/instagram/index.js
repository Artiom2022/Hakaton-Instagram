//! likes  у нас самый уникальный лайк)))))) КВАДРАТНЫЙ!
{
  const likes = document.querySelectorAll(
    ".post__actions .post__action:first-child"
  );
  const postsBlock = document.querySelector(".posts");
  postsBlock.addEventListener("click", (event) => {
    const target = event.target;
    const isLikeClick =
      target.classList.contains("insta_like") ||
      target.classList.contains("insta_like_fill");

    if (isLikeClick) {
      const parent = target.parentNode;
      if (parent.getAttribute("like") == "true") {
        parent.removeAttribute("like", "true");
        parent.innerHTML =
          ' <img src="./icon/Vector (heard).svg" alt="" class="insta_like""/>';
        //   console.log("условие сработало");
      } else {
        parent.setAttribute("like", "true");
        parent.innerHTML =
          ' <img src="./icon/Vector (heard).svg" alt="" class="insta_like" style="background-color: red;"/>';
        //   console.log("условие не сработало");
      }
    }
  });
}

// post generetion and render
// ? post render
{
  const defaultPostData = {
    img: "https://placeimg.com/378/570/animals?id=",
    user: {
      photo: "https://i.pravatar.cc/240?img=",
      nickname: "@__akmatbek0v",
    },
  };

  // функция генерации постов

  function postGeneretion(postCount = 1) {
    const posts = [];
    let isHorizontal = false;

    for (let i = 1; i <= postCount / 2; i++) {
      const postImg = defaultPostData.img + i;
      const userPhoto = defaultPostData.user.photo + i;
      const post = postHTMLGenerate(postImg, userPhoto, isHorizontal);

      const post2Img = defaultPostData.img + i + 1;
      const user2Photo = defaultPostData.user.photo + i;
      const post2 = postHTMLGenerate(post2Img, user2Photo, !isHorizontal);

      const postColumn = document.createElement("div");
      postColumn.appendChild(post);
      postColumn.appendChild(post2);

      posts.push(postColumn);

      isHorizontal = !isHorizontal;
    }
    return posts;
  }

  function postHTMLGenerate(postImg, userPhoto, isHorizontal) {
    // создвем блок див
    const post = document.createElement("div");
    post.className = isHorizontal ? "post post-horizontal" : "post";

    post.innerHTML = `
<div class="post__img">
<img src="${postImg}" alt="" />
</div>
<div class="post__footer">
<div class="post__user">
<div class="user user_row">
  <div class="user__avatar">
    <img src="${userPhoto}" alt="" />
  </div>
  <div class="user__nickname">@__akmatbek0v</div>
</div>
</div>
<div class="post__actions">
<div class="post__action">
  <img
    src="./icon/Vector (heard).svg"
    alt=""
    class="insta_like"
  />
</div>
<div class="post__action">
  <img
    src="./icon/uil_comment.svg"
    alt=""
    class="insta_comment"
  />
</div>
<div class="post__action">
  <img
    src="./icon/icon-park-outline_send-2.png"
    alt=""
    class="insta_message"
  />
</div>
</div>
</div>
  `;

    return post;
  }

  const postsGenereted = postGeneretion(9);

  const postsBlock = document.querySelector(".posts");
  postsBlock.innerHTML = "";

  postsGenereted.forEach((post) => {
    postsBlock.appendChild(post);
  });
}

// create post

// modal акно
const createButton = document.querySelector(".new-post-button");
const modal = document.querySelector(".modal__wrap");
const modalElements = {
  text: modal.querySelector(".modal__text"),
  img: modal.querySelector("#link"),
  hashtag: modal.querySelector("#hashtag"),
  saveBtn: modal.querySelector("#save-post"),
};

createButton.addEventListener("click", () => {
  if (modal.classList.contains("hidden")) {
    modal.classList.remove("hidden");
  }
});

modal.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal__wrap")) {
    modal.classList.add("hidden");
  }
});

// сохраняем пост

modalElements.saveBtn.addEventListener("click", () => {
  if (isHaveErrors()) return;
  renderNewPostHTML(modalElements.img.value);
  modal.classList.add("hidden");
  modalElements.text.value = "";
  modalElements.img.value = "";
  modalElements.hashtag.value = "";
});

function isHaveErrors() {
  let isError = false;
  modalElements.text.classList.remove("modal__error");
  modalElements.img.classList.remove("modal__error");

  if (!modalElements.text.value) {
    modalElements.text.classList.add("modal__error");
    isError = true;
  }
  if (!modalElements.img.value) {
    modalElements.img.classList.add("modal__error");
    isError = true;
  }

  return isError;
}

function renderNewPostHTML(postPhotoURL) {
  const postsBlock = document.querySelector(".posts");
  const lastColumn = document.querySelector(".posts > div:last-child");
  const lastColumnPosts = lastColumn.querySelectorAll(".post");
  const lastPostIndex = lastColumnPosts.length - 1;
  const isHorizontal =
    lastColumnPosts[lastPostIndex].classList.contains("post-horizontal");
  const postHTML = postHTMLGenerate(
    postPhotoURL,
    "https://i.pravatar.cc/240",
    !isHorizontal
  );

  console.log(lastColumnPosts);

  if (lastColumnPosts.length > 1) {
    const newColumn = document.createElement("div");
    newColumn.appendChild(postHTML);

    postsBlock.appendChild(newColumn);
  } else {
    lastColumn.appendChild(postHTML);
  }
}
