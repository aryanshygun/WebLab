const hero = document.getElementById('hero')
const hero1 = document.getElementById('hero1')
const hero2 = document.getElementById('hero2')
const hero3 = document.getElementById('hero3')
const hero4 = document.getElementById('hero4')

function activate(x){
    hero1.classList = 'color ri-circle-line'
    hero2.classList = 'color ri-circle-line'
    hero3.classList = 'color ri-circle-line'
    hero4.classList = 'color ri-circle-line'
    x.classList = 'color ri-circle-fill ri-2x'
    hero.style.backgroundImage = `url('images/${x.id}.jpg')`
}

hero1.addEventListener('click', () => {
    activate(hero1)
})

hero2.addEventListener('click', () => {
    activate(hero2)
})

hero3.addEventListener('click', () => {
    activate(hero3)
})

hero4.addEventListener('click', () => {
    activate(hero4)
})

const holders = document.querySelectorAll('.holder');

holders.forEach(holder => {
    const paragraph = holder.querySelector('.pp');

    holder.addEventListener('mouseover', () => {
        paragraph.style.opacity = '1';
    });

    holder.addEventListener('mouseout', () => {
        paragraph.style.opacity = '0';
    });
});