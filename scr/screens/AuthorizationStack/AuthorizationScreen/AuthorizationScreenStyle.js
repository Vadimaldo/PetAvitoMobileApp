import {COLORS} from "../../../constants/COLORS";

export const style = {
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white
  },
  logo_image: {
    width: 142,
    height: 32,
    resizeMode: 'cover',
    marginBottom: 100
  },
  screen_title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 22,
    marginBottom: 40
  },
  screen_title_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginBottom: 184
  },
  text_input_container: {
    width: '100%',
    gap: 15,
    marginBottom: 10
  },
  text_input: {
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderRadius: 10,
    paddingLeft: 18,
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
  auth_link_text_button: {
    color: COLORS.mainPink,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  }
}
