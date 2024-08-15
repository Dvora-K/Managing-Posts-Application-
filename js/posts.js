(function() {
    let main = document.querySelector('main')
    let list = document.getElementById("postsList");

    let x = 1;
    getPostsTitles();

    function getPostsTitles() {
        createGetRequest(`posts?page=${x}&per_page=12`, showPosts);
    }

    function showPosts(e) {
        if (e.target.status >= 200 && e.target.status < 300) {
            const postsList = JSON.parse(e.target.responseText);
            localStorage.setItem('post-list', JSON.stringify(postsList));
            postsList.forEach(postTitle => {
                list.insertAdjacentHTML("beforeend", `<li><a class="text" href='#'>${postTitle.title}</a></li>`);
            });
            document.querySelectorAll('ul li a').forEach(link => link.addEventListener('click', openSingleTemplate));
            const sumOfPosts = this.getResponseHeader('X-Pagination-Total');
            document.getElementById("indexOfPage").innerHTML = `${x}/${Math.floor(sumOfPosts/12)}`
            document.getElementById("sumOfPosts").innerHTML = `There are ${sumOfPosts} posts`

        } else
            console.log("oops! An error occurred");
    }

    document.getElementById("next").addEventListener('click', nextBotton);
    document.getElementById("previous").addEventListener('click', previousBotton);

    function nextBotton() {
        x++;
        list.innerHTML = '';
        getPostsTitles();
    }

    function previousBotton() {
        x--;
        if (x < 1) {
            alert('...')
        }
        list.innerHTML = '';
        getPostsTitles();
    }

    function openSingleTemplate(e) {
        main.innerHTML = '';
        var temp = document.querySelector("#singlePost");
        var clonedTemplate = temp.content.cloneNode(true);
        document.querySelector('main').appendChild(clonedTemplate);
        prevPage = currPage;
        currPage = "singlePost";
        history.pushState({}, "singlePost", '#' + "singlePost");
        getArticleDetails(e);
    }

    function getArticleDetails(e) {
        e.preventDefault();
        if (isLogIn) {
            document.querySelector("#addComment").classList.remove("hide");
        }
        let data = JSON.parse(localStorage.getItem('post-list'));
        for (let i = 0; i < data.length; i++) {
            if (data[i].title == e.target.innerHTML) {
                currPostId = data[i].id;
                createGetRequest(`comments?post_id=${data[i].id}`, showComments);
                document.getElementById("titleArticle").innerHTML = data[i].title;
                document.getElementById("bodyArticle").innerHTML = data[i].body;
                createGetRequest(`users/${data[i].user_id}`, showriter);
                break;
            }
        }
        document.querySelector("#addComment").addEventListener('click', addComment);

        function addComment() {
            document.getElementById("descriptionComment").classList.remove('hide');
        }
        document.getElementById('saveComment').addEventListener('click', saveComment);

        function saveComment() {
            let commentData = {
                post_id: currPostId,
                name: userData.name,
                email: userData.email,
                body: document.getElementById("descriptionUserComment").value
            };
            let string = JSON.stringify(commentData);
            createPostRequest(`posts/${currPostId}/comments`, responseAfterCreateComment, string);
        }

        function responseAfterCreateComment(e) {
            if (e.target.status >= 200 && e.target.status < 300) {
                alert('Your comment added successfully');
                document.getElementById("descriptionComment").classList.add('hide');
            } else {
                alert('something go wrong...')
            }
        }

        function showComments(e) {
            if (e.target.status >= 200 && e.target.status < 300) {
                if (e.target.responseText != "[]") {
                    let divComments = document.getElementById("commentsArticle")
                    const comment = JSON.parse(e.target.responseText);
                    for (let i = 0; i < comment.length; i++) {
                        divComments.insertAdjacentHTML("beforeend", `<p class="text">${comment[i].name} say:<br>"${comment[i].body}"</p>`);
                    }
                }

            }
        }
    }

})()

function showriter(e) {
    let data = JSON.parse(e.target.responseText);
    document.getElementById("authorArticle").innerHTML = data.name;
}
// mh0527118441@gmail.com