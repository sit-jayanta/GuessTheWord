/* eslint-disable react-native/no-inline-styles */
import {
  Canvas,
  Path,
  SkPath,
  Skia,
  TouchInfo,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

type PathWithColorAndWidth = {
  path: SkPath;
  color: Color;
  strokeWidth: number;
  strokeType : string;
};

const GameScreen = ({route}) => {
  const [paths, setPaths] = useState<PathWithColorAndWidth[]>([]);
  const [color, setColor] = useState<Color>(Colors[0]);
  const [strokeWidth, setStrokeWidth] = useState(strokes[0]);
  const [isPencilSelected, updatePencilSelected] = useState(true);
  const height = useWindowDimensions().height;

  useState(()=>{
  console.log(route.params.roomcode);
  console.log(route.params.username);
  console.log(route.params.isCreater);
  console.log(route.params.joiningCode);
  },[]);

  const onDrawingStart = useCallback(
    (touchInfo: TouchInfo) => {
      setPaths((currentPaths) => {
        const { x, y } = touchInfo;
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        return [
          ...currentPaths,
          {
            path: newPath,
            color,
            strokeWidth,
            strokeType : isPencilSelected ? 'stroke' : 'fill',
          },
        ];
      });
    },
    [color, strokeWidth, isPencilSelected]
  );

  const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
    setPaths((currentPaths) => {
      const { x, y } = touchInfo;
      const currentPath = currentPaths[currentPaths.length - 1];
      const lastPoint = currentPath.path.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, []);

  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
    },
    [onDrawingActive, onDrawingStart]
  );

  return (
    <View style={style.container}>
      <Toolbar
        color={color}
        strokeWidth={strokeWidth}
        setColor={setColor}
        setStrokeWidth={setStrokeWidth}
      />
      <Canvas style={[style.container,{backgroundColor: 'white',marginVertical: 10,height: height/1.5, borderWidth:1, borderColor: 'black', elevation: 10}]} onTouch={touchHandler}>
        {paths.map((path, index) => (
          <Path
            key={index}
            path={path.path}
            color={path.color}
            style={path.strokeType}
            strokeWidth={path.strokeWidth - 2}
          />
        ))}
      </Canvas>
     <View style={{flexDirection: 'row', flexWrap: 'wrap',width: 120, height: 40,alignItems: 'flex-start', justifyContent: 'flex-start'}}>
<TouchableOpacity onPress={()=>updatePencilSelected(true)} style={{width: 40, height: 40,marginStart: 10,backgroundColor: 'white',elevation: 10,borderRadius:10, borderWidth: isPencilSelected ? 2 : 0, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}} >
<Image resizeMode='contain' source={require('../assets/icons/pencil.png')}/>
</TouchableOpacity>
<TouchableOpacity onPress={()=>updatePencilSelected(false)} style={{width: 40, height: 40,marginStart: 10,elevation: 10, borderRadius:10,backgroundColor: 'white', borderWidth: isPencilSelected ? 0 : 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}} >
<Image resizeMode='contain' source={require('../assets/icons/brush.png')}/>
</TouchableOpacity>
     </View>
    </View>
  );
};

const Colors = ['black', 'red', 'blue', 'green', 'yellow', 'white','#FFDE59','#8D6F64','#EFC3CA','#E8E8E8'] as const;

type Color = (typeof Colors)[number];

type ToolbarProps = {
  color: Color;
  strokeWidth: number;
  setColor: (color: Color) => void;
  setStrokeWidth: (strokeWidth: number) => void;
};

const strokes = [4,6,8,10,12,14,16,18,20];

const Toolbar = ({
  color,
  strokeWidth,
  setColor,
  setStrokeWidth,
}: ToolbarProps) => {
  const [showStrokes, setShowStrokes] = useState(false);
  const width = useWindowDimensions().width;

  const handleStrokeWidthChange = (stroke: number) => {
    setStrokeWidth(stroke);
    setShowStrokes(false);
  };

  const handleChangeColor = (color: Color) => {
    setColor(color);
  };

  return (
    <>
      {showStrokes && (
        <View style={[style.toolbar, style.strokeToolbar]}>
          {strokes.map((stroke) => (
            <Pressable
            style={{backgroundColor: 'white', height: stroke+10, width: stroke+10, alignItems: 'center',justifyContent: 'center'}}
              onPress={() => handleStrokeWidthChange(stroke)}
              key={stroke}
            >
              <Text style={[style.strokeOption,{height: stroke, width: stroke}]}/>
            </Pressable>
          ))}
        </View>
      )}
      <View style={[style.toolbar,{width: width-15, marginHorizontal: 15}]}>
        <Pressable
          style={[style.currentStroke, { height: 25, width: 25, alignItems: 'center', justifyContent: 'center'}]}
          onPress={() => setShowStrokes(!showStrokes)}
        >
          <Text style={[style.strokeOption,{height: strokeWidth, width: strokeWidth,}]}/>
        </Pressable>
        <View style={style.separator} />
        {Colors.map((item) => (
          <ColorButton
            isSelected={item === color}
            key={item}
            color={item}
            onPress={() => handleChangeColor(item)}
          />
        ))}
      </View>
    </>
  );
};

type ColorButtonProps = {
  color: Color;
  isSelected: boolean;
  onPress: () => void;
};

const ColorButton = ({ color, onPress, isSelected }: ColorButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        style.colorButton,
        { backgroundColor: color },
        isSelected && {
          borderWidth: 4,
          borderColor: 'black',
        },
        !isSelected && {
          borderWidth: 1,
          borderColor: 'grey'
        }
      ]}
    />
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  strokeOption: {
    fontSize: 1,
    backgroundColor: 'black',
    borderRadius: 150,
  },
  toolbar: {
    backgroundColor: 'white',
    elevation: 10,
    marginTop: 5,
    height: 50,
    borderRadius: 100,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  separator: {
    height: 30,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginHorizontal: 10,
  },
  currentStroke: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 50,
  },
  strokeToolbar: {
    position: 'absolute',
    top: 70,
    justifyContent: 'space-between',
    zIndex: 100,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 2,
  },
});

export default GameScreen;
