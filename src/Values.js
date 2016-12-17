// CDefStrings object
// --------------------------------------------------------------
/* Copyright (c) 1996-2012 Clickteam
 *
 * This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
 *
 * Permission is hereby granted to any person obtaining a legal copy
 * of Clickteam Multimedia Fusion 2 to use or modify this source code for
 * debugging, optimizing, or customizing applications created with
 * Clickteam Multimedia Fusion 2.
 * Any other use of this source code is prohibited.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

function CDefStrings()
{
	this.nStrings = 0;
	this.strings = null;
}
CDefStrings.prototype =
{
	load: function (file)
	{
		this.nStrings = file.readAShort();
		this.strings = new Array(this.nStrings);
		var n;
		for (n = 0; n < this.nStrings; n++)
		{
			this.strings[n] = file.readAString();
		}
	}
}

// CDefValues object
// --------------------------------------------------------------
function CDefValues()
{
	this.nValues = 0;
	this.values = null;
}
CDefValues.prototype =
{
	load: function (file)
	{
		this.nValues = file.readAShort();
		this.values = new Array(this.nValues);
		var n;
		for (n = 0; n < this.nValues; n++)
		{
			this.values[n] = file.readAInt();
		}
	}
}

// CRVal object
// --------------------------------------------------------------
CRVal.VALUES_NUMBEROF_ALTERABLE = 26;
CRVal.STRINGS_NUMBEROF_ALTERABLE = 10;
function CRVal()
{
	this.rvValueFlags = 0;
	this.rvValues = null;
	this.rvStrings = null;
}
CRVal.prototype =
{
	init:      function (ho, ocPtr, cob)
	{
		this.rvValueFlags = 0;
		this.rvValues = new Array(CRVal.VALUES_NUMBEROF_ALTERABLE);
		this.rvStrings = new Array(CRVal.STRINGS_NUMBEROF_ALTERABLE);
		var n;
		for (n = 0; n < this.rvValues.length; n++)
			this.rvValues[n] = 0;
		for (n = 0; n < this.rvStrings.length; n++)
			this.rvStrings[n] = "";

		if (ocPtr.ocValues != null)
		{
			for (n = 0; n < ocPtr.ocValues.nValues; n++)
				this.rvValues[n] = ocPtr.ocValues.values[n];
		}
		if (ocPtr.ocStrings != null)
		{
			for (n = 0; n < ocPtr.ocStrings.nStrings; n++)
				this.rvStrings[n] = ocPtr.ocStrings.strings[n];
		}
	},
	kill:      function (bFast)
	{
		var n;
		for (n = 0; n < this.rvValues.length; n++)
			this.rvValues[n] = 0;
		for (n = 0; n < this.rvStrings.length; n++)
			this.rvStrings[n] = null;
	},
	getValue:  function (n)
	{
		if (n < this.rvValues.length)
			return this.rvValues[n];
		return 0;
	},
	getString: function (n)
	{
		if (n < this.rvStrings.length)
			return this.rvStrings[n];
		return "";
	},
	setString: function (n, s)
	{
		if (n > this.rov.rvStrings.length)
			this.growStrings(n + 10);
		this.rvStrings[n] = s;
	},
	setValue:  function (n, v)
	{
		if (n > this.rov.rvValues.length)
			this.growValues(n + 10);
		this.rvValues[n] = v;
	},
	growValues: function(num)
	{
		if (num >= this.rvValues.length)
		{
			var n;
			for (n = 0; n < num; n++)
				this.rvValues[n] = 0;
		}
	},
	growStrings: function(num)
	{
		if (num >= this.rvStrings.length)
		{
			var n;
			for (n = 0; n < num; n++)
				this.rvStrings[n] = "";
		}
	}
}


