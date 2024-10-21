import React from 'react';
import {Actionsheet, Box, Pressable, ScrollView, Text} from 'native-base';
import {Image, View} from "react-native";
import {COLORS} from "../../constants/COLORS";

export function ActionSheet({
  open, handleClose, active, setActive, data,
}) {
  //Смена активного элемента в выборе типа питомца
  const handleChangeActive = (type) => {
    if (active === type) {
      setActive('');
    } else {
      setActive(type)
    }
  };

  return (
    <Actionsheet
      padding={0}
      isOpen={open}
      position="relative"
      onClose={handleClose}
    >
      <Actionsheet.Content
        style={{
          elevation: 0
        }}
        padding={0}
        backgroundColor="#fff"
      >
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          style={{
            paddingHorizontal: 20
          }}
        >
          <Text
            fontFamily="Montserrat-SemiBold"
            color={COLORS.black}
            fontSize="16px"
          >
            Выберите подходящее животное
          </Text>
        </Box>
        <ScrollView
          showsVerticalScrollIndicator={false}
          maxHeight="250px"
          marginTop="22px"
          width="100%"
          style={{
            paddingHorizontal: 20
          }}
        >
          {data?.length ? data?.map((el, index) => {
            return (
              <Pressable
                onPress={() => handleChangeActive(el?.type)}
                key={index}
                flexDirection="row"
                alignItems="center"
                width="100%"
                height="50px"
                gap="10px"
              >
                {
                  el?.type === active ?
                    <Image style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'cover'
                    }} source={require('../../../assets/image/icons/check.png')} /> : <View style={{width: 20}} />
                }
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text fontSize={14} marginRight={5} fontFamily='Montserrat-Regular'>
                    {el?.name}
                  </Text>
                </View>
              </Pressable>
            );
          }) : null}
        </ScrollView>
      </Actionsheet.Content>

    </Actionsheet>
  );
}