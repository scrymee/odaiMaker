const elements = document.querySelectorAll("[data-chaffle]");
Array.prototype.forEach.call(elements, function (el) {
    const chaffle = new Chaffle(el, {
        lang: 'ja'
        /* options */
    });


    let isClicked = false;
    document.getElementById('btn').addEventListener('click', () => {
        const selectedNameList = getClickedCategoryName()
        if (!selectedNameList.length) {
            alert('カテゴリを選択して下さい')
            return;
        }
        if (!isClicked) {
            chaffle.init(selectedNameList);
            const btn = document.getElementById('btn');
            btn.textContent = 'STOP!'
        } else {
            chaffle.stop();
            const btn = document.getElementById('btn');
            btn.textContent = 'START!'

        }
        isClicked = !isClicked
    })

    function getClickedCategoryName() {
        let selectedNameList = [];
        const elements = document.querySelectorAll(".category-btn.clicked-btn");
        Array.prototype.forEach.call(elements, e => {
            selectedNameList = selectedNameList.concat(TEXT[e.getAttribute('data-value')])
        })
        return selectedNameList
    }


});


const categories = document.querySelectorAll('.category-btn');
Array.prototype.forEach.call(categories, category => {
    category.addEventListener('click', () => {
        if (category.classList.contains('clicked-btn')) {
            category.classList.remove('clicked-btn');
        } else {
            category.classList.add('clicked-btn');
        }
    })

})