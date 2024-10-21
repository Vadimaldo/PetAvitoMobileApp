import {COLORS} from "../../constants/COLORS";

export const style = {
  item_container: {
    width: 165,
    marginBottom: 25
  },
  image_item: {
    width: 165,
    height: 105,
    resizeMode: 'cover',
    borderRadius: 26
  },
  item_text_container: {
    paddingHorizontal: 12,
    paddingTop: 12
  },
  item_name_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  item_name_text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
  item_years_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: COLORS.lightGrayText
  },
  item_years_description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: COLORS.lightGrayText,
    marginBottom: 16
  },
  item_years_price: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    mBottom: 20,
  },
}