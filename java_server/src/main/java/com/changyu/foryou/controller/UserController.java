package com.changyu.foryou.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.changyu.foryou.model.Users;
import com.changyu.foryou.service.UserService;
import com.changyu.foryou.tools.AesCbcUtil;
import com.changyu.foryou.tools.Constants;
import com.changyu.foryou.tools.HttpRequest;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	private static final Logger logger = Logger.getLogger(UserController.class);
	
	/**
	 * 用户登陆
	 * @param phone
	 * @param password
	 * @return
	 */
	@RequestMapping(value="/toLoginWx")
	public @ResponseBody
	Map<String, Object> toLoginWx(@RequestParam String wx_code,@RequestParam String encryptedData,@RequestParam String iv) {
		Map<String, Object> map = new HashMap<String, Object>();
			
		//登录凭证不能为空 
		if (wx_code == null || wx_code.length() == 0) 
		{ 
			map.put("State", "Fail"); 
			map.put("info", "授权凭证错误"); 
			return map; 	
		} 

		//小程序唯一标识  (在微信小程序管理后台获取) 
		String wxspAppid = Constants.appId;
		//小程序的 app secret (在微信小程序管理后台获取) 
		String wxspSecret = Constants.apiKey;
	    //授权（必填） 
		String grant_type = "authorization_code"; 
	
	
		//////////////// 1、向微信服务器 使用登录凭证 code 获取 session_key 和 openid //////////////// 
		//请求参数 
		String params = "appid=" + wxspAppid + "&secret=" + wxspSecret + "&js_code=" + wx_code + "&grant_type=" + grant_type; 
		//发送请求 
		String sr = HttpRequest.sendGet("https://api.weixin.qq.com/sns/jscode2session", params); 
		//解析相应内容（转换成json对象） 
		//JSONObject json = JSONObject.fromObject(sr); 
		JSONObject json = JSONObject.parseObject(sr);
		
		//获取会话密钥（session_key）
		String session_key = "";
		if(json.get("session_key") != null){
			session_key = json.get("session_key").toString(); 
		}
		else
		{
			map.put("State", "Fail"); 
			map.put("info", "获取信息失败"); 
			return map; 
		}
		
	
		//////////////// 2、对encryptedData加密数据进行AES解密 //////////////// 
		try { 
		  String result = AesCbcUtil.decrypt(encryptedData, session_key, iv, "UTF-8");
		  if (null != result && result.length() > 0) 
		  { 
		
			JSONObject userInfoJSON = JSONObject.parseObject(result); 
			
			JSONObject userInfo = new JSONObject(); 
			userInfo.put("openId", userInfoJSON.get("openId")); 
			userInfo.put("nickName", userInfoJSON.get("nickName")); 
			userInfo.put("gender", userInfoJSON.get("gender")); 
			userInfo.put("city", userInfoJSON.get("city")); 
			userInfo.put("province", userInfoJSON.get("province")); 
			userInfo.put("country", userInfoJSON.get("country")); 
			userInfo.put("avatarUrl", userInfoJSON.get("avatarUrl")); 
			userInfo.put("user_id", userInfoJSON.get("openId")); 
			userInfo.put("user_token", userInfoJSON.get("unionId"));

			JSONObject loginInfo = new JSONObject();
			loginInfo.put("is_login", "1");
			loginInfo.put("userInfo", userInfo); 
			
			try {
				
				Users users = userService.checkLogin(userInfoJSON.get("openId").toString());
				if (users != null)
				{
					users.setImgUrl(userInfoJSON.get("avatarUrl").toString());
					users.setNickname(userInfoJSON.get("nickName").toString());
					users.setLastLoginDate(new Date());
					users.setSex(new Short(userInfoJSON.get("gender").toString()));
					userService.updateUserInfo(users);
				}
				else
				{
					Users users2 = new Users(userInfoJSON.get("openId").toString(), userInfoJSON.get("nickName").toString(),
							userInfoJSON.get("avatarUrl").toString(),userInfoJSON.get("gender").toString());
					userService.addUsers(users2);
				}				
			} catch (Exception e) {
				logger.error("[login fail]userId=" + userInfoJSON.get("openId"));
			}
			
			map.put("State", "Success"); 
			map.put("data", loginInfo); 
			return map; 
		  }
		} 
		catch (Exception e) 
		{ 
			e.printStackTrace();
			logger.error("[login fail]" + e.getMessage()); 
		} 
		
		map.put("State", "Fail"); 
		map.put("info", "登陆失败"); 
		return map; 	
	
	}


	/**
	 * 获取我的用户总信息
	 * @param phone 用户id
	 * @return
	 */
	@RequestMapping(value="getMineInfoWx")
	public @ResponseBody Map<String, Object> getMineInfoWx(@RequestParam String user_id){
		Map<String, Object> map = new HashMap<String, Object>();
	
		Users users=userService.selectByUserId(user_id);
		if(users == null)
		{
			map.put("State", "Fail"); 
			map.put("info", "获得我的信息失败"); 
			return map; 
		}
		
		JSONObject obj = new JSONObject();
		obj.put("phone", users.getPhone());
		obj.put("registType", users.getType());
	
			
		map.put("State", "Success"); 
		map.put("data", obj); 
		return map;
	}
	
}
