package com.changyu.foryou.serviceImpl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.changyu.foryou.mapper.EmployeeMapper;
import com.changyu.foryou.mapper.UsersMapper;
import com.changyu.foryou.model.Employee;
import com.changyu.foryou.model.Users;
import com.changyu.foryou.service.EmployeeService;
import com.changyu.foryou.service.UserService;
import com.changyu.foryou.tools.ToolUtil;


@Service("employeeService")
public class EmployeeServiceImpl implements EmployeeService {
	private EmployeeMapper employeeMapper;         //操作用户信息

	@Autowired
	public void setEmployeeMapperr(EmployeeMapper employeeMapper) {
		this.employeeMapper = employeeMapper;
	}

	
	public Employee selectByPhone(String phone) {
		return employeeMapper.selectByPrimaryKey(phone);
	}


	public void addEmployee(Employee employee) {
		employeeMapper.insertSelective(employee);
	}

	
	@Override
	public Employee checkLogin(String phone) {
		return employeeMapper.checkLogin(phone);
	}
	public int updateLastLoginTime(Map<String, Object> paramMap){
		return employeeMapper.updateLastLoginTime(paramMap);
	}
}
