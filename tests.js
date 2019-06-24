const test = require('ava');
const { position, coords } = require('./index');

function node(rect, scrollLeft = 0, scrollTop = 0) {
  return {
    getBoundingClientRect() {
      return rect;
    },

    ownerDocument: {
      scrollingElement: {
        scrollTop,
        scrollLeft
      }
    }
  };
}

test('position', t => {
  const container = node({
    width: 180,
    height: 90
  });

  let element;

  element = node({
    top: 13,
    left: 29,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'top left', 'top left');

  element = node({
    top: 14,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'top center', 'top center');

  element = node({
    top: 14,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'top right', 'top right');

  element = node({
    top: 30,
    left: 29,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'middle left');

  element = node({
    top: 30,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'middle center', 'middle center');

  element = node({
    top: 30,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'middle right', 'middle right');

  element = node({
    top: 46,
    left: 29,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'bottom left', 'bottom left');

  element = node({
    top: 46,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'bottom center', 'bottom center');

  element = node({
    top: 46,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'bottom right', 'bottom right');
});

test('coords', t => {
  const reference = node({
    top: 20,
    left: 50,
    width: 60,
    height: 30
  });

  const element = node(
    {
      top: 13,
      left: 29,
      width: 20,
      height: 10
    },
    10,
    5
  );

  t.deepEqual(
    coords('top left', element, reference),
    {
      left: 60,
      top: 15,
      position: 'top left'
    },
    'top left'
  );

  t.deepEqual(
    coords('top center', element, reference),
    {
      left: 80,
      top: 15,
      position: 'top center'
    },
    'top center'
  );

  t.deepEqual(
    coords('top right', element, reference),
    {
      left: 100,
      top: 15,
      position: 'top right'
    },
    'top right'
  );

  t.deepEqual(
    coords('right top', element, reference),
    {
      left: 120,
      top: 25,
      position: 'right top'
    },
    'right top'
  );

  t.deepEqual(coords('right middle', element, reference), {
    left: 120,
    top: 35,
    position: 'right middle'
  });

  t.deepEqual(
    coords('right bottom', element, reference),
    {
      left: 120,
      top: 45,
      position: 'right bottom'
    },
    'right bottom'
  );

  t.deepEqual(
    coords('bottom left', element, reference),
    {
      left: 60,
      top: 55,
      position: 'bottom left'
    },
    'bottom left'
  );

  t.deepEqual(
    coords('bottom center', element, reference),
    {
      left: 80,
      top: 55,
      position: 'bottom center'
    },
    'bottom center'
  );

  t.deepEqual(
    coords('bottom right', element, reference),
    {
      left: 100,
      top: 55,
      position: 'bottom right'
    },
    'bottom right'
  );

  t.deepEqual(
    coords('left top', element, reference),
    {
      left: 40,
      top: 25,
      position: 'left top'
    },
    'left top'
  );

  t.deepEqual(
    coords('left middle', element, reference),
    {
      left: 40,
      top: 35,
      position: 'left middle'
    },
    'left middle'
  );

  t.deepEqual(
    coords('left bottom', element, reference),
    {
      left: 40,
      top: 45,
      position: 'left bottom'
    },
    'left bottom'
  );
});

test('coords with container parameter', t => {
  const container = node({
    top: 0,
    left: 0,
    right: 100,
    bottom: 70
  });

  const element = node({
    width: 40,
    height: 30
  });

  let reference;

  reference = node({
    top: 29,
    left: 0,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top left', element, reference, container),
    {
      left: 0,
      top: 39,
      position: 'bottom left'
    },
    'top left, overflowing top'
  );

  reference = node({
    top: 30,
    left: 61,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top left', element, reference, container),
    {
      left: 41,
      top: 0,
      position: 'top right'
    },
    'top left, overflowing right'
  );

  reference = node({
    top: 29,
    left: 61,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top left', element, reference, container),
    {
      left: 41,
      top: 39,
      position: 'bottom right'
    },
    'top left, overflowing top right'
  );

  reference = node({
    top: 29,
    left: 10,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container),
    {
      left: 0,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top'
  );

  reference = node({
    top: 30,
    left: 9,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container),
    {
      left: -1,
      top: 0,
      position: 'top center'
    },
    'top center, overflowing left'
  );

  reference = node({
    top: 30,
    left: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container),
    {
      left: 61,
      top: 0,
      position: 'top center'
    },
    'top center, overflowing right'
  );

  reference = node({
    top: 29,
    left: 9,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container),
    {
      left: -1,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top left'
  );

  reference = node({
    top: 29,
    left: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container),
    {
      left: 61,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top right'
  );

  reference = node({
    top: 29,
    left: 20,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top right', element, reference, container),
    {
      left: 0,
      top: 39,
      position: 'bottom right'
    },
    'top right, overflowing top'
  );

  reference = node({
    top: 30,
    left: 19,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top right', element, reference, container),
    {
      left: 19,
      top: 0,
      position: 'top left'
    },
    'top right, overflowing left'
  );

  reference = node({
    top: 29,
    left: 19,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top right', element, reference, container),
    {
      left: 19,
      top: 39,
      position: 'bottom left'
    },
    'top right, overflowing top left'
  );

  reference = node({
    top: 0,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right top', element, reference, container),
    {
      left: 1,
      top: 0,
      position: 'left top'
    },
    'right top, overflowing right'
  );

  reference = node({
    top: 41,
    left: 40,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right top', element, reference, container),
    {
      left: 60,
      top: 21,
      position: 'right bottom'
    },
    'right top, overflowing bottom'
  );

  reference = node({
    top: 41,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right top', element, reference, container),
    {
      left: 1,
      top: 21,
      position: 'left bottom'
    },
    'right top, overflowing bottom right'
  );

  reference = node({
    top: 10,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right middle', element, reference, container),
    {
      left: 1,
      top: 0,
      position: 'left middle'
    },
    'right middle, overflowing right'
  );

  reference = node({
    top: 9,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right middle', element, reference, container),
    {
      left: 1,
      top: -1,
      position: 'left middle'
    },
    'right middle, overflowing top right'
  );
});
