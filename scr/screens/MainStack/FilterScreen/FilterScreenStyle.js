import {COLORS} from "../../../constants/COLORS";

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
    justifyContent: 'space-between'
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
  text_input_second_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 15,
    width: '100%'
  },
  text_input: {
    width: '40%',
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderRadius: 10,
    paddingLeft: 18,
    color: COLORS.grayText,
  },
  text_chose_category: {
    paddingVertical: 15,
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
    marginTop: 40
  },
  bottom_text: {
    color: COLORS.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
}