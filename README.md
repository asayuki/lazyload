# Lazyload

Lazyloading images/backgrounds. It checks the effective device width the user has and loads images from `data`-attribute based on this width.

Desktop (>1024px) will take from `data-src`, tablet (768-1024px) will take from `data-src-medium` and mobile will take from `data-src-small`.

## Options
* `selector` - Which CSS-class to look after
* `scrollLoad` - If images should be loaded when they are visible on screen

## Initialize

``` js
var lazyload = new Lazyload({
  selector: 'lazy',
  scrollLoad: true
});
```

``` html
<img class="lazy" data-src="http://placekitten.com/200/300" data-src-medium="http://placekitten.com/100/150" data-src-small="http://placekitten.com/50/75">
<img class="lazy" data-src="http://placekitten.com/200/301" data-src-medium="http://placekitten.com/100/151" data-src-small="http://placekitten.com/50/76">
<img class="lazy" data-src="http://placekitten.com/200/302" data-src-medium="http://placekitten.com/100/152" data-src-small="http://placekitten.com/50/77">
<div class="lazy" style="width: 700px; height: 700px; background-size: cover;" data-src="http://placekitten.com/200/303" data-src-medium="http://placekitten.com/100/153" data-src-small="http://placekitten.com/50/78"></div>
<img class="lazy" data-src="http://placekitten.com/200/303" data-src-medium="http://placekitten.com/100/153" data-src-small="http://placekitten.com/50/78">
```

Example resides in sandbox.

## Todo

* Add queries to js-init.
