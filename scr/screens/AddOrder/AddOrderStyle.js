import {COLORS} from "../../constants/COLORS";

export const style = {
  container: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  header_container: {
    width: '100%',
    marginTop: 25,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header_text: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22
  },
  text_input_container: {
    gap: 15,
    marginBottom: 25
  },
  text_input_title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18
  },
  text_input: {
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderRadius: 10,
    paddingLeft: 18,
    color: COLORS.grayText,
  },
  choose_category_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderRadius: 10,
    paddingLeft: 18,
    paddingRight: 10,
    color: COLORS.grayText,
  },
  choose_category_text: {
    color: COLORS.grayText,
  },
  bottom: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: COLORS.mainPink,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40
  },
  bottom_text: {
    color: COLORS.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
}