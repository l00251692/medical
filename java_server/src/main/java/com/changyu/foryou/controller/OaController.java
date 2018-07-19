package com.changyu.foryou.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.changyu.foryou.model.Employee;
import com.changyu.foryou.service.EmployeeService;
import com.changyu.foryou.service.UserService;
import com.changyu.foryou.tools.Constants;
import com.changyu.foryou.tools.Md5;

@Controller
@RequestMapping("/oa")
public class OaController {
	
	@Autowired
	private EmployeeService employeeService;
	
	private static final Logger logger = Logger.getLogger(OaController.class);
	
	/**
	 * 用户登陆
	 * @param phone
	 * @param password
	 * @return
	 */
	@RequestMapping(value="/toLogin")
	public @ResponseBody
	Map<String, Object> toLogin(@RequestParam String phone,@RequestParam String password,HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();

		if (phone!=null&&password!=null&&!phone.trim().equals("") && !password.trim().equals("")) {
			Employee employee = employeeService.checkLogin(phone);
			if (employeeService != null) {
				System.out.println(Md5.GetMD5Code(password));
				if (employee.getPassword().equals(Md5.GetMD5Code(password))) {
					
					map.put(Constants.STATUS, Constants.SUCCESS);
					map.put(Constants.MESSAGE, "登陆成功");
					map.put("type", employee.getType());
					HttpSession session=request.getSession();
					session.setAttribute("type", employee.getType());
					session.setAttribute("phone", employee.getPhone());
					
					Map<String, Object> paramMap = new HashMap<String, Object>();
					paramMap.put("phone",phone);
					paramMap.put("lastLoginDate",new Date());
					
					employeeService.updateLastLoginTime(paramMap);
				} else {
					map.put(Constants.STATUS, Constants.FAILURE);
					map.put(Constants.MESSAGE, "账号或密码错误，请检查后输入");
				}
			} else {
				map.put(Constants.STATUS, Constants.FAILURE);
				map.put(Constants.MESSAGE, "账号或密码错误，请检查后输入");
			}
		}

		return map;
	}
}
