A 2D frogger game, created with HTML5 Canvas.


## New: animated characters and rewards

**11 new animated characters** (`images/chars/*.png`, listed in `js/shop.js`): Fluffy Sheep, Cow, Pudding Pup, Shiba, Little Deer,
Purple Frog, Rock Girl, Sister, Shell Dragon, Iron Knight, Red Hood. Each one has a walk cycle in 4 directions, plus breathing/blinking
when standing still. In the shop, hover (or tap) a card to see it walk.

**Getting characters**
- Buy them in the shop with coins (Characters tab), or
- win them from Loot Boxes (bigger boxes and rarer prizes = better chance, guaranteed within 12 boxes) or from the treasure chests on the road.

**Rewards tab** (`js/rewards.js`): 7-day daily streak (day 7 = free character) and 10 missions that pay coins.

**Adding more characters**: cut a sprite sheet into 4 rows (down, left, right, up) of 101x171 frames, save it in `images/chars/`,
add one line to `CHARACTERS` in `js/shop.js`, and add the file to `sw.js`.
