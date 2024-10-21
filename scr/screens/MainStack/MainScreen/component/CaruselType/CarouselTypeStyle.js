import {COLORS} from "../../../../../constants/COLORS";

export const style = {
  carousel_item_container: {
    flexDirection: 'row',
    marginRight: 6,
    borderRadius: 26,
    paddingLeft: 8,
    paddingRight: 19,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayText,
    alignItems: 'center',
    gap: 12,
    height: 52,
    marginBottom: 20
  },
  carousel_item_container_selected: {
    backgroundColor: COLORS.mainPink,
    borderColor: COLORS.mainPink,
  },
  carousel_item_image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20
  },
  carousel_item_title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  },
  carousel_item_title_selected: {
    color: COLORS.white
  },
}