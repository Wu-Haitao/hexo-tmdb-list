"use strict";

let items = document.getElementsByClassName("tmdb-item");
let posters = document.querySelectorAll(".tmdb-picture img");

function RefreshImage() {
    for (let i = 0; i < items.length; i++) {
        
        if (!items[i].classList.contains("tmdb-hide")) {
            let imgPath = items[i].dataset.src;
            items[i].style.backgroundImage = `url(${imgPath})`;
            
            let posterImgPath = posters[i].dataset.src;
            posters[i].src = posterImgPath;
        }
    }
}



var firstpages = document.getElementsByClassName("tmdb-firstpage"),
    previouspages = document.getElementsByClassName("tmdb-previouspage"),
    nextpages = document.getElementsByClassName("tmdb-nextpage"),
    lastpages = document.getElementsByClassName("tmdb-lastpage"),
    pagenums = document.getElementsByClassName("tmdb-pagenum");

function makePageNum(a, b) {
    var c = Math.ceil;
    return a + 1 + " / " + c(0 == b.length / 10 ? 1 : c(b.length / 10))
}

function firstBtn() {
    var a = this.parentNode.siblings();
    displayPage(a, 0), this.parentNode.getElementsByClassName("tmdb-pagenum")[0].innerText = makePageNum(0, a)
}

function previousBtn() {
    var a = this.parentNode.siblings(),
        b = this.parentNode.getElementsByClassName("tmdb-pagenum")[0].innerText;
    b = b.substr(0, b.indexOf("/") - 1), b = parseInt(b, 10) - 1, 0 < b && b--, displayPage(a, b), this.parentNode.getElementsByClassName("tmdb-pagenum")[0].innerText = makePageNum(b, a)
}

function nextBtn() {
    var a = this.parentNode.siblings(),
        b = this.parentNode.getElementsByClassName("tmdb-pagenum")[0].innerText;
    b = b.substr(0, b.indexOf("/") - 1), b = parseInt(b, 10) - 1, b < Math.ceil(a.length / 10) - 1 && b++, displayPage(a, b), this.parentNode.getElementsByClassName("tmdb-pagenum")[0].innerText = makePageNum(b, a)
}

function lastBtn() {
    var a = Math.ceil,
        b = this.parentNode.siblings();
    displayPage(b, a(b.length / 10) - 1), this.parentNode.getElementsByClassName("tmdb-pagenum")[0].innerText = makePageNum(-1 == a(b.length / 10) - 1 ? 0 : a(b.length / 10) - 1, b)
}

function displayPage(a, b) {
    for (var c = 0; c < a.length; c++)
        if (Math.floor(c / 10) === b) {
            a[c].classList.remove("tmdb-hide");
            //var d = a[c].getElementsByTagName("img")[0];
            //d.src = d.getAttribute("data-src")
        } else a[c].classList.add("tmdb-hide");

    RefreshImage();
}

for (var i = 0; i < firstpages.length; i++) {
    firstpages[i].onclick = firstBtn, previouspages[i].onclick = previousBtn, nextpages[i].onclick = nextBtn, lastpages[i].onclick = lastBtn; // set page num
    var size = pagenums[i].parentNode.siblings().length;
    pagenums[i].innerText = "1 / " + (0 === Math.ceil(size / 10) ? 1 : Math.ceil(size / 10)), firstpages[i].click()
}