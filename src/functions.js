import {useCallback,useEffect} from 'react';
export function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function SensorFix(api: SensorAPI) {
  const preDrag: ?PreDragActions = api.tryGetLock('1');
  // Could not get lock
  if (!preDrag) {
    return;
  }

  const drag: SnapDragActions = preDrag.snapLift();

  drag.moveDown();
  drag.moveUp();


  drag.drop();
}

export function useMyCoolSensor(api: SensorAPI) {
  const start = useCallback(function start(event: MouseEvent) {
    const preDrag: ?PreDragActions = api.tryGetLock('algorithm');
    if (!preDrag) {
      return;
    }

    preDrag.moveDown();
    preDrag.drop();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener('click', start);

    return () => {
      window.removeEventListener('click', start);
    };
    // eslint-disable-next-line
  }, []);
}
